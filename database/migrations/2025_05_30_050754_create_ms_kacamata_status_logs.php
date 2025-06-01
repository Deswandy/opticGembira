<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ms_kacamata_status_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ms_kacamatas_id')->constrained('ms_kacamatas');
            $table->foreignId('ms_kacamata_statuses_id')->constrained('ms_kacamata_statuses');
            $table->foreignId('user_id')->constrained('users');
            $table->text('notes')->nullable();
            $table->timestamp('timestamp')->useCurrent(); // Tambahkan timestamp
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ms_kacamata_status_logs');
    }
};
