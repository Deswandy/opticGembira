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
     // In your migration file (e.g., 2025_05_23_213711_create_ms_kacamata_table.php)
Schema::create('ms_kacamata', function (Blueprint $table) {
    $table->string('id')->primary();
    $table->foreignUuid('merk')->constrained('ms_merk');
    $table->string('tipe');
    $table->string('bahan');
    $table->string('jenis_lensa')->nullable(); // Add this line
    $table->decimal('harga', 12, 2)->nullable(); // Add this line
    $table->string('foto')->nullable();
    $table->string('status');
    $table->string('laci');
    $table->timestamps();
    
    $table->foreign('status')->references('status')->on('ms_kacamata_status');
    $table->foreign('laci')->references('laci')->on('ms_laci');
});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ms_kacamata');
    }
};
