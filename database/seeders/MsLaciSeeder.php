<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsLaci;

class MsLaciSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            MsLaci::create(['laci' => 'A' . $i]);
        }
    }
}
