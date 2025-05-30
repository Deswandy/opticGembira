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
        Schema::create('ms_kacamata_statuses', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['Tersedia','Dipinjam','Terjual','Cacat','Lainnya'])->default('Tersedia');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('ms_kacamata_statuses');
    }
};
