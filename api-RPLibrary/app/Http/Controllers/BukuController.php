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

    public function filter($filter)
    {
        switch ($filter) {
            case 'newest':
                $data = Buku::orderBy('created_at', 'desc')->get();
                break;
            case 'oldest':
                $data = Buku::orderBy('created_at', 'asc')->get();
                break;
            default:
                $data = Buku::all();
                break;
        }

        return response()->json([
            'message' => 'Data filtered',
            'data' => $data,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->cover) {
            if ($request->hasFile('cover')) {
                $nama_cover = $request->file('cover')->getClientOriginalName();
                $request->file('cover')->move(public_path('book_cover'), $nama_cover);
                $data = [
                    'judul' => $request->judul,
                    'pengarang' => $request->pengarang,
                    'deskripsi' => $request->deskripsi,
                    'penerbit' => $request->penerbit,
                    'tahun_terbit' => $request->tahun_terbit,
                    'isbn13' => $request->isbn13,
                    'bahasa' => $request->bahasa,
                    'harga' => $request->harga,
                    'page_number' => $request->page_number,
                    'cover' => url('book_cover/' . $nama_cover),
                    'rating' => $request->rating,
                    // 'namafile' => $request->namafile,
                ];
            } else {
                $data = [
                    'judul' => $request->judul,
                    'pengarang' => $request->pengarang,
                    'deskripsi' => $request->deskripsi,
                    'penerbit' => $request->penerbit,
                    'tahun_terbit' => $request->tahun_terbit,
                    'isbn13' => $request->isbn13,
                    'bahasa' => $request->bahasa,
                    'harga' => $request->harga,
                    'page_number' => $request->page_number,
                    'cover' => $request->cover,
                    'rating' => $request->rating,
                ];
            }
        } else {
            $data = [
                'judul' => $request->judul,
                'pengarang' => $request->pengarang,
                'deskripsi' => $request->deskripsi,
                'penerbit' => $request->penerbit,
                'tahun_terbit' => $request->tahun_terbit,
                'isbn13' => $request->isbn13,
                'bahasa' => $request->bahasa,
                'harga' => $request->harga,
                'page_number' => $request->page_number,
                'rating' => $request->rating,
                // 'namafile' => $request->namafile,
            ];
        }

        $buku = Buku::create($data);
        return response()->json([
            'message' => 'Berhasil Menambah Buku',
            'data' => $buku
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($idbuku)
    {
        //get singular buku
        $data = Buku::where('idbuku', $idbuku)->get();
        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], 200);
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
        $data = [
            'judul' => $request->judul,
            'pengarang' => $request->pengarang,
            'deskripsi' => $request->deskripsi,
            'penerbit' => $request->penerbit,
            'tahun_terbit' => $request->tahun_terbit,
            'isbn13' => $request->isbn13,
            'bahasa' => $request->bahasa,
            'harga' => $request->harga,
            'page_number' => $request->page_number,
            'rating' => $request->rating
        ];

        if ($request->hasFile('cover')) {
            $nama_cover = $request->file('cover')->getClientOriginalName();
            $request->file('cover')->move(public_path('book_cover'), $nama_cover);
            $data['cover'] = url('book_cover/' . $nama_cover);
        }

        if ($request->hasFile('namafile')) {
            $nama_file = $request->file('namafile')->getClientOriginalName();
            $request->file('namafile')->move(public_path('book_files'), $nama_file);
            $data['namafile'] = url('book_files/' . $nama_file);
        }

        if ($request->hasFile('namafile')) {
            error_log('namafile received: ' . $request->file('namafile')->getClientOriginalName());
        } else {
            error_log('namafile not received');
        }


        $buku = Buku::where('idbuku', $idbuku)->update($data);

        if ($buku) {
            return response()->json([
                'message' => 'Berhasil mengedit buku!',
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
