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
            $table->integer('ms_kacamatas_id')->unsigned();
            $table->integer('ms_kacamata_statuses_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->text('notes')->nullable();
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
