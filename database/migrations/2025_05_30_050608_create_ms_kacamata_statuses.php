<?php
// database/migrations/xxxx_xx_xx_create_ms_kacamata_statuses_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ms_kacamata_statuses', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['Tersedia', 'Dipinjam', 'Terjual', 'Cacat'])->default('Tersedia');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ms_kacamata_statuses');
    }
};
