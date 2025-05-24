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
   // In your migration file (e.g., 2025_05_23_213717_create_kacamata_status_log_table.php)
Schema::create('kacamata_status_logs', function (Blueprint $table) {
    $table->uuid('id')->primary(); // Make sure this is UUID
    $table->string('kacamata_id'); // This should match ms_kacamata.id type
    $table->uuid('user_id'); // This should match ms_user.id type
    $table->string('status_id');
    $table->text('notes')->nullable();
    $table->timestamps();
    
    // Add these foreign key constraints later in a separate migration
});
    
    // Add foreign keys in a separate migration or later
}

public function down()
{
    Schema::dropIfExists('kacamata_status_logs');
}
};
