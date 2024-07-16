<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Http\Requests\StoreOrderDetailRequest;
use App\Http\Requests\UpdateOrderDetailRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('order_details')->join('bukus', 'order_details.idbuku', '=', 'bukus.idbuku')->select('order_details.*', 'bukus.*')->get();


        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
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
            'idbuku' => $request->idbuku,
            'jumlah' => $request->jumlah
        ];

        DB::table('bukus')->where('idbuku', $data['idbuku'])->increment('terjual', $data['jumlah']);

        OrderDetail::create($data);
        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($idorder)
    {
        $data = DB::table('order_details')->join('bukus', 'order_details.idbuku', '=', 'bukus.idbuku')->select('order_details.*', 'bukus.*')->where('idorder', $idorder)->get();

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderDetail $orderDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderDetailRequest $request, OrderDetail $orderDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetail $orderDetail)
    {
        //
    }
}
