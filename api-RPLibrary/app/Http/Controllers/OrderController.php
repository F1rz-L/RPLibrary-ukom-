<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('orders')->join('users', 'orders.iduser', '=', 'users.id')->select('orders.*', 'users.nama')->get();

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = [
            'idorder' => $request->idorder,
            'iduser' => $request->iduser,
            'status' => $request->status,
            'tglorder' => $request->tglorder,
            'total' => $request->total
        ];

        $user = DB::table('users')->where('id', $data['iduser'])->first(['saldo']);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $saldoSekarang = $user->saldo - $data['total'];
        DB::table('users')->where('id', $data['iduser'])->update(['saldo' => $saldoSekarang]);

        $order = Order::create($data);
        return response()->json([
            'message' => 'Success',
            'data' => $order
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($iduser)
    {
        $order = Order::where('iduser', $iduser)->get();
        return response()->json([
            'message' => 'Success',
            'data' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idorder)
    {
        $order = Order::where('idorder', $idorder)->delete();

        DB::table('order_details')->where('idorder', $idorder)->delete();

        return response()->json([
            'message' => 'Success',
            'data' => $order
        ], 200);
    }
}
