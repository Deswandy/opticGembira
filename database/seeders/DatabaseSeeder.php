<?php

namespace Database\Seeders;
use App\Models\User;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
   
public function run(): void
{
    // Buat user dummy
    User::factory()->create([
        'id' => 1,
        'name' => 'Seeder Admin',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    // Panggil seeder lain
    $this->call([
        MsMerkSeeder::class,
        MsLaciSeeder::class,
        MsKacamataStatusSeeder::class,
        MsKacamataSeeder::class,
        MsKacamataStatusLogSeeder::class,
    ]);
}

}