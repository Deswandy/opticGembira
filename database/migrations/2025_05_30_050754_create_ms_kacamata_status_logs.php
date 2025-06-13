<?php
// database/migrations/xxxx_xx_xx_create_ms_kacamata_status_logs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ms_kacamata_status_logs', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('ms_kacamatas_id');
            $table->unsignedBigInteger('ms_kacamata_statuses_id');
            $table->unsignedBigInteger('user_id'); // diasumsikan ada user

            $table->timestamps();

            $table->foreign('ms_kacamatas_id')->references('id')->on('ms_kacamatas')->onDelete('cascade');
            $table->foreign('ms_kacamata_statuses_id')->references('id')->on('ms_kacamata_statuses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ms_kacamata_status_logs');
    }
};
