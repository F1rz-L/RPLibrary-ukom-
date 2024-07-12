<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
