<?php

namespace App\Http\Controllers;

use App\Mail\SendOTPMail;
use App\Models\Pelanggan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = new User();
        $rules = [
            'nama' => 'required',
            'regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&.,_-]/',
            ],
            'alamat' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'status' => false
            ], 400);
        } else {
            $otp = rand(100000, 999999);

            $user->nama = $request->nama;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->alamat = $request->alamat;
            $user->otp = $otp;
            $user->save();

            Mail::to($user->email)->send(new SendOTPMail($otp, $user->nama));

            return response()->json([
                'message' => "Mailed",
                'status' => true,
                'message' => 'User created successfully',
            ], 201);
        }
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'status' => false
            ], 400);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details',
                'status' => false
            ], 401);
        } else {
            $user = User::where('email', $request->email)->first();

            if ($user->status == 2) {
                $subscription = Subscription::where('iduser', $user->id)->first();
                if ($subscription->tglakhir < date('Y-m-d')) {
                    $user->status = 1;
                    $user->save();
                }
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            if ($user->otp == 0) {
                if ($user->status == 5) {
                    return response()->json([
                        'message' => 'Your account has been banned',
                        'status' => false
                    ], 400);
                } else {
                    return response()->json([
                        'message' => 'Email Verified',
                        'status' => true,
                        'user' => $user,
                        'iduser' => $user->id,
                        'token_type' => 'Bearer',
                        'auth_token' => $token,
                    ], 200);
                }
            } else {
                return response()->json([
                    'message' => 'Email Not Verified',
                    'status' => false
                ], 400);
            }
        }
    }

    public function forgotPassword(Request $request)
    {
        // Validate the email field
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'status' => false
            ], 400);
        }

        // Get the user from the database
        $user = User::where('email', $request->email)->first();

        // Generate a password reset token
        $token = Str::random(60);

        // Store the token in the password_resets table
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => Hash::make($token),
            'created_at' => now()
        ]);

        // Construct the reset link pointing to the React frontend
        $resetLink = "http://localhost:5173/resetpassword?token=" . $token . "&email=" . urlencode($request->email);

        // Send the reset link via email
        Mail::send('reset-password', ['resetLink' => $resetLink], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Reset Your Password');
        });

        return response()->json([
            'message' => 'A password reset link has been sent to your email.',
            'status' => true
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&.,_-]/',
                'confirmed',
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'status' => false
            ], 400);
        }

        // Check if the reset token and email match the database record
        $passwordReset = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$passwordReset) {
            return response()->json([
                'message' => 'Invalid token or email.',
                'status' => false
            ], 400);
        }

        // Reset the user's password
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the reset record so the token cannot be reused
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Password has been successfully reset.',
            'status' => true
        ], 200);
    }

    public function checkOTP(Request $request)
    {

        $user = User::where('email', $request->email)->first();
        if ($request->otp == $user->otp) {
            User::where('email', $request->email)->update(['otp' => 0]);

            return response()->json([
                'message' => 'OTP Matched',
                'status' => true
            ], 200);
        } else {
            return response()->json([
                'message' => 'OTP Not Matched',
                'status' => false
            ], 400);
        }
    }
}
