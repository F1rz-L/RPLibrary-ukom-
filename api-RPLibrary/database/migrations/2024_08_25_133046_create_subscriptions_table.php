<?php

use App\Models\Subscription;
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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->increments('idsubscription');
            $table->integer('iduser');
            $table->date('tglakhir');
            $table->integer('status')->default(1);
            $table->timestamps();
        });

        Subscription::create([
            'iduser' => 3,
            'tglakhir' => date('Y-m-d', strtotime('+1 month'))
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
