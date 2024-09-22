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
            $table->decimal('saldo', 14, 2)->default(0); // Decimal with 14 digits, 2 of which are after the decimal point
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
            'nama' => 'Joni1',
            'email' => 'joni1@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 1,
            'saldo' => 0,
        ]);
        User::create([
            'nama' => 'Joni2',
            'email' => 'joni2@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 1,
            'saldo' => 0,
        ]);
        User::create([
            'nama' => 'Joni3',
            'email' => 'joni3@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 1,
            'saldo' => 0,
        ]);

        User::create([
            'nama' => 'Tejo1',
            'email' => 'tejo1@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 2,
            'saldo' => 0,
        ]);
        User::create([
            'nama' => 'Tejo2',
            'email' => 'tejo2@g.cc',
            'password' => bcrypt('123'),
            'alamat' => 'Bangah Regency',
            'status' => 2,
            'saldo' => 0,
        ]);
        User::create([
            'nama' => 'Tejo3',
            'email' => 'tejo3@g.cc',
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
