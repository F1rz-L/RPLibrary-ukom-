<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestBuku extends Model
{
    use HasFactory;

    protected $table = 'request_bukus';

    protected $fillable = [
        'idrequest',
        'judul',
        'pengarang',
        'isbn13',
    ];
}
