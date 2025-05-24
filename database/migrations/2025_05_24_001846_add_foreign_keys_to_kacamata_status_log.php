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
    // Pastikan tabel sudah ada
    if (Schema::hasTable('kacamata_status_logs')) {
        Schema::table('kacamata_status_logs', function (Blueprint $table) {
            $table->foreign('user_id')
                  ->references('id')
                  ->on('ms_user')
                  ->onDelete('cascade');
        });
    }
}
};
