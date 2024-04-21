<?php

namespace App\Http\Controllers;

use App\Models\RequestBuku;
use App\Http\Requests\StoreRequestBukuRequest;
use App\Http\Requests\UpdateRequestBukuRequest;

class RequestBukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = RequestBuku::orderBy('judul', 'ASC')->get();

        return response()->json([
            'message' => 'Success',
            'status' => true,
            'data' => $data,
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
    public function store(StoreRequestBukuRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RequestBuku $requestBuku)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequestBuku $requestBuku)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequestBukuRequest $request, RequestBuku $requestBuku)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestBuku $requestBuku)
    {
        //
    }
}
