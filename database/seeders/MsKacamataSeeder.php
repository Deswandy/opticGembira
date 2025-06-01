<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsKacamata;
use App\Models\MsMerk;
use App\Models\MsLaci;
use App\Models\MsKacamataStatus;

class MsKacamataSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            MsKacamata::create([
                'ms_merks_id' => MsMerk::inRandomOrder()->first()->id,
                'ms_lacis_id' => MsLaci::inRandomOrder()->first()->id,
                'ms_kacamata_statuses_id' => MsKacamataStatus::inRandomOrder()->first()->id,
                'tipe' => 'Tipe ' . $i,
                'foto' => null,
                'bahan' => fake()->randomElement(['Plastik', 'Logam', 'Kayu']),
            ]);
        }
    }
}
