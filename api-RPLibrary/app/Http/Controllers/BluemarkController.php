<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Pinjaman;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BluemarkController extends Controller
{
    public function pinjam($idbuku, Request $request)
    {
        $datapinjam = [
            'idbuku' => $idbuku,
            'idpeminjam' => $request->iduser,
            'tglpinjam' => date('Y-m-d'),
            'tglkembali' => date('Y-m-d', strtotime('+7 days')),
            'status' => 0,
        ];
        Pinjaman::create($datapinjam);

        User::where('id', $request->iduser)->update(['idbukupinjam' => $idbuku]);
        $data = Buku::where('idbuku', $idbuku)->update(['idpeminjam' => $request->iduser]);

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    public function indexPinjam(){
        $data = DB::table('pinjamen')->join('bukus', 'pinjamen.idbuku', '=', 'bukus.idbuku')->select('pinjamen.*', 'bukus.*')->get();
        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    public function showPinjam($idpeminjam)
    {
    }
}
