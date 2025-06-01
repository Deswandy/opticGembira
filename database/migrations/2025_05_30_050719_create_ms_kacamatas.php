<?php
// database/migrations/xxxx_xx_xx_create_ms_kacamatas_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ms_kacamatas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('ms_merks_id');
            $table->unsignedBigInteger('ms_lacis_id');
            $table->unsignedBigInteger('ms_kacamata_statuses_id');

            $table->string('tipe');
            $table->string('foto')->nullable();
            $table->string('bahan');
            $table->timestamps();

            $table->foreign('ms_merks_id')->references('id')->on('ms_merks')->onDelete('cascade');
            $table->foreign('ms_lacis_id')->references('id')->on('ms_lacis')->onDelete('cascade');
            $table->foreign('ms_kacamata_statuses_id')->references('id')->on('ms_kacamata_statuses')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ms_kacamatas');
    }
};
