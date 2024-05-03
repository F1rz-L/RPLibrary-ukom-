<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Http\Requests\StoreBukuRequest;
use App\Http\Requests\UpdateBukuRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Controller untuk menampilkan semua buku
        $data = Buku::all();
        return response()->json([
            'message' => 'Success',
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
    public function store(StoreBukuRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Buku $buku)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($idbuku, StoreBukuRequest $request)
    {
        
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idbuku)
    {
        $this->validate($request, [
            'judul' => 'required',
            'pengarang' => 'required',
            'deskripsi' => 'required',
            'penerbit' => 'required',
            'tahun_terbit' => 'required',
            'isbn13' => 'required',
            'bahasa' => 'required',
            'harga' => 'required',
            'page_number' => 'required',
            'cover' => 'required',
        ]);
        
        $data = [
            // 'judul' => $request->input('judul'),
            // 'pengarang' => $request->input('pengarang'),
            // 'deskripsi' => $request->input('deskripsi'),
            // 'penerbit' => $request->input('penerbit'),
            // 'tahun_terbit' => $request->input('tahun_terbit'),
            // 'isbn13' => $request->input('isbn13'),
            // 'bahasa' => $request->input('bahasa'),
            // 'harga' => $request->input('harga'),
            // 'page_number' => $request->input('page_number'),
            // 'cover' => $request->input('cover'),

            'judul' => $request->judul,
            'pengarang' => $request->pengarang,
            'deskripsi' => $request->deskripsi,
            'penerbit' => $request->penerbit,
            'tahun_terbit' => $request->tahun_terbit,
            'isbn13' => $request->isbn13,
            'bahasa' => $request->bahasa,
            'harga' => $request->harga,
            'page_number' => $request->page_number,
            'cover' => $request->cover
        ];

        $buku = Buku::where('idbuku', $idbuku)->update($data);

        if ($buku) {
            return response()->json([
                'message' => 'Berhasil mengedit buku',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'message' => 'Gagal mengedit buku',
                'data' => $data
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idbuku)
    {
        $data = Buku::where('idbuku', $idbuku)->delete();

        if ($data) {
            return response()->json([
                'message' => 'Berhasil menghapus buku',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'message' => 'Gagal menghapus buku',
                'data' => $data
            ], 400);
        }
    }
}
