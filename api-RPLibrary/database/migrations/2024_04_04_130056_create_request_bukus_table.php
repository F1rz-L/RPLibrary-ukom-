<?php

use App\Models\RequestBuku;
use Faker\Factory;
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
        Schema::create('request_bukus', function (Blueprint $table) {
            $table->increments('idrequest');
            $table->string('judul');
            $table->string('pengarang');
            $table->string('isbn13');
            $table->timestamps();
        });

        $faker = Factory::create();
        for($i = 0; $i < 5; $i++){
            RequestBuku::create([
                'judul' => $faker->sentence(3, true),
                'pengarang' => $faker->name,
                'isbn13' => $faker->isbn13
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_bukus');
    }
};
