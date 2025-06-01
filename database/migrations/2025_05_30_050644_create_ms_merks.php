<?php
// database/migrations/xxxx_xx_xx_create_ms_merks_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ms_merks', function (Blueprint $table) {
            $table->id();
            $table->string('merk');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ms_merks');
    }
};
