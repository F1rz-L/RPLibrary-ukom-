<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $fillable = [
        'idgenre',
        'judul',
        'pengarang',
        'deskripsi',
        'penerbit',
        'tahun_terbit',
        'cover',
        'isbn13',
        'rating',
    ];
}
