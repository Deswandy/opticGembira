<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('ms_user', function (Blueprint $table) {
            // Primary key using UUID
            $table->uuid('id')->primary();
            
            // User details
            $table->string('nama', 100);
            $table->string('email', 100)->unique();
            $table->string('password');
            $table->string('role', 20)->default('karyawan');
            
            // Authentication fields
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('email');
            $table->index('role');
            
            // Table configuration
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
            $table->comment('Tabel untuk menyimpan data pengguna sistem');
        });

        // Ensure the table exists before creating foreign keys in other tables
        Schema::table('ms_user', function (Blueprint $table) {
            if (Schema::hasTable('kacamata_status_log')) {
                $table->foreign('id')
                    ->references('user_id')
                    ->on('kacamata_status_log')
                    ->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Drop foreign key references first
        Schema::table('kacamata_status_log', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        
        Schema::dropIfExists('ms_user');
    }
};