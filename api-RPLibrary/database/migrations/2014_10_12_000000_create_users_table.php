<?php

use App\Models\Subscription;
use App\Models\User;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('alamat');
            $table->string('password');
            $table->integer('status')->default(1)->nullable();
            $table->integer('otp')->default(0);
            $table->float('saldo', 14)->default(0);
            $table->integer('idbukupinjam')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        User::create([
            'nama' => 'admin',
            'email' => 'adm@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Aloha Regency',
            'status' => 0,
            'saldo' => 1000000000,
        ]);

        User::create([
            'nama' => 'Joni',
            'email' => 'joni@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 1,
            'saldo' => 0,
        ]);

        User::create([
            'nama' => 'Tejo',
            'email' => 'tejo@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 2,
            'saldo' => 0,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
