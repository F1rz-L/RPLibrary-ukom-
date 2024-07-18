<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;

class BluemarkController extends Controller
{
    public function pinjam($idbuku, Request $request){
        $request = [
            'iduser' => $request->iduser,
        ];

        $data = Buku::where('idbuku', $idbuku)->update(['idpeminjam' => $request['iduser']]);

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }
}
