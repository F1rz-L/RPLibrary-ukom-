<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlgorithmController extends Controller
{
    public function trending()
    {
        $data = Buku::orderBy('terjual', 'desc') // Assuming 'terjual' indicates sales
            ->take(6) // Limit to top 5
            ->get();

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }
}
