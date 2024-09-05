<?php

namespace App\Http\Controllers;

use App\Mail\SendOTPMail;
use App\Models\Pelanggan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = new User();
        $rules = [
            'nama' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
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
                return response()->json([
                    'message' => 'Email Verified',
                    'status' => true,
                    'user' => $user,
                    'iduser' => $user->id,
                    'token_type' => 'Bearer',
                    'auth_token' => $token,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Email Not Verified',
                    'status' => false
                ], 400);
            }
        }
    }

    public function checkOTP(Request $request){

        $user = User::where('email', $request->email)->first();
        if($request->otp == $user->otp){
            User::where('email', $request->email)->update(['otp' => 0]);
            
            return response()->json([
                'message' => 'OTP Matched',
                'status' => true
            ], 200);
        }else{
            return response()->json([
                'message' => 'OTP Not Matched',
                'status' => false
            ], 400);
        }
    }
}
