<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

\Midtrans\Config::$serverKey = 'SB-Mid-server-ud1bJoG_t5XDEvIiS0lX5IMv';
\Midtrans\Config::$isProduction = false; // Set to true for production
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'message' => 'Success',
            'data' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($iduser)
    {
        $user = User::where('id', $iduser)->first();
        return response()->json([
            'message' => 'Success fetching user data',
            'data' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($iduser)
    {
        $data = User::where('id', $iduser)->delete();
        if ($data) {
            return response()->json([
                'message' => 'Success deleting user data',
                'data' => $data
            ]);
        }
    }

    public function switchUser($iduser)
    {
        $user = User::find($iduser);
        if ($user->status == 1 || $user->status == 2) {
            $data = User::where('id', $iduser)->update(['status' => 0]);
        }
        if ($user->status == 0) {
            $data = User::where('id', $iduser)->update(['status' => 1]);
        }

        if ($data) {
            return response()->json([
                'message' => 'Success changing role',
                'data' => $data
            ]);
        }
    }

    public function topup($iduser, Request $request)
    {
        $user = User::find($iduser);
        $topupAmount = $request->topupamount;

        // Midtrans transaction details
        $params = [
            'transaction_details' => [
                'order_id' => 'TOPUP-' . time() . '-' . $iduser,
                'gross_amount' => $topupAmount,
            ],
            'customer_details' => [
                'first_name' => $user->nama,
                'email' => $user->email,
            ]
        ];

        // Create transaction using Midtrans API
        try {
            $transaction = \Midtrans\Snap::createTransaction($params);

            // Return Snap Token to the frontend
            return response()->json([
                'snapToken' => $transaction->token,
                'redirectUrl' => $transaction->redirect_url,
                'message' => 'Proceed to payment'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Midtrans error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function confirmTopup($iduser, Request $request)
    {
        $user = User::find($iduser);
        $currentamount = $user->saldo + $request->topupamount;
        $data = User::where('id', $iduser)->update(['saldo' => $currentamount]);
        if ($data) {
            return response()->json([
                'message' => 'Success topup balance',
                'data' => $data
            ]);
        }
    }
}
