<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsKacamata;
use App\Models\MsMerk;
use App\Models\MsLaci;
use App\Models\MsKacamataStatus;
use Illuminate\Support\Str;


class MsKacamataSeeder extends Seeder
{
    public function run(): void
{
    $usedNewIds = [];

    for ($i = 1; $i <= 10; $i++) {
        // Generate 3 karakter unik (huruf dan angka)
        do {
            $newid = strtoupper(Str::random(3)); // Contoh hasil: A1C, Z9B
        } while (in_array($newid, $usedNewIds) || MsKacamata::where('newid', $newid)->exists());

        $usedNewIds[] = $newid;

        MsKacamata::create([
            'newid' => $newid, // Kolom baru
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
