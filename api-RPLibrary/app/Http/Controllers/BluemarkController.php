<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Pinjaman;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

    public function indexPinjam()
    {
        $data = DB::table('pinjamen')
            ->join('bukus', 'pinjamen.idbuku', '=', 'bukus.idbuku')
            // ->where('status', 0)
            ->select('pinjamen.*', 'bukus.*')
            ->get();

        // calculate denda
        $currentDate = Carbon::now();
        $data->transform(function ($item) use ($currentDate) {
            $tglkembali = Carbon::parse($item->tglkembali);

            if ($currentDate->greaterThan($tglkembali)) {
                $daysLate = $currentDate->diffInDays($tglkembali);
                $denda = $daysLate * 500;
                $status = 1;
            } else {
                $denda = 0;
                $status = 0;
            }

            // Update the record in the database
            DB::table('pinjamen')->where('idpinjaman', $item->idpinjaman)->update([
                'denda' => $denda,
                'status' => $status,
            ]);

            return $item;
        });

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    public function showPinjam($idpeminjam)
    {
        $data = Pinjaman::where('idpeminjam', $idpeminjam)->first();

        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    public function kembali($idpinjaman)
    {
        $data = Pinjaman::where('idpinjaman', $idpinjaman)->first();
        $user = User::where('id', $data->idpeminjam)->first();
        
        if ($data->status == 1) {
            $denda = $data->denda;
            $saldoAfter = $user->saldo - $denda;
            
            User::where('id', $data->idpeminjam)->update(['saldo' => $saldoAfter]);
            User::where('id', $data->idpeminjam)->update(['idbukupinjam' => null]);
            Buku::where('idbuku', $data->idbuku)->update(['idpeminjam' => null]);
            Pinjaman::where('idpinjaman', $idpinjaman)->delete();
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], 200);
        } else {
            User::where('id', $data->idpeminjam)->update(['idbukupinjam' => null]);
            Buku::where('idbuku', $data->idbuku)->update(['idpeminjam' => null]);
            Pinjaman::where('idpinjaman', $idpinjaman)->delete();
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], 200);
        }
    }

    public function subscribe(Request $request)
    {
        $user = User::where('id', $request->iduser)->first();

        if ($user) {
            $user->status = 2;
            $user->saldo -= 120000;
            $user->save();  // Save the updated status

            // Create a new subscription
            $data = [
                'iduser' => $request->iduser,
                'tglakhir' => date('Y-m-d', strtotime('+1 month'))
            ];

            $subscription = Subscription::create($data);

            return response()->json([
                'message' => 'Success',
                'data' => $subscription
            ], 200);
        } else {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
    }

    public function checkSubscription($iduser)
    {
        $subscription = Subscription::where('iduser', $iduser)->first();
        return response()->json([
            'message' => 'Success',
            'data' => $subscription
        ], 200);
    }
}
