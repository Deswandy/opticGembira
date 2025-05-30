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
        Schema::create('ms_kacamatas', function (Blueprint $table) {
            $table->id();
            $table->int('ms_merks_id')->unsigned();
            $table->int('ms_lacis_id')->unsigned();
            $table->int('ms_kacamata_statuses_id')->unsigned();
            $table->string('tipe');
            //TAMBAHKAN FIELD UNTUK FILE FOTO
            $table->string('bahan');
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
        Schema::dropIfExists('ms_kacamatas');
    }
};
