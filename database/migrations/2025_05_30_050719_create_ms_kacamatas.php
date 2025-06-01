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
            $table->foreignId('ms_merks_id')->constrained('ms_merks');
            $table->foreignId('ms_lacis_id')->constrained('ms_lacis');
            $table->foreignId('ms_kacamata_statuses_id')->constrained('ms_kacamata_statuses');
            $table->string('tipe');
            $table->string('foto')->nullable(); // Field untuk file foto
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
