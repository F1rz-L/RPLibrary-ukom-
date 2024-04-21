<?php

use App\Models\Buku;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bukus', function (Blueprint $table) {
            $table->increments('idbuku');
            // $table->integer('idgenre');
            $table->string('judul');
            $table->string('pengarang');
            $table->string('deskripsi');
            $table->string('penerbit');
            $table->string('tahun_terbit');
            $table->string('isbn13', 13);
            $table->float('rating');
            $table->string('cover');
            $table->string('namafile')->nullable();
            $table->timestamps();
        });

        $faker = Faker\Factory::create();
        for($i = 0; $i < 10; $i++){
            Buku::create([
                'judul' => $faker->sentence(),
                'pengarang' => $faker->name,
                'deskripsi' => $faker->paragraph,
                'penerbit' => $faker->company,
                'tahun_terbit' => $faker->year,
                'isbn13' => $faker->isbn13,
                'rating' => $faker->numberBetween(0, 5),
                'cover' => $faker->imageUrl(640, 480, 'books'),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukus');
    }
};
