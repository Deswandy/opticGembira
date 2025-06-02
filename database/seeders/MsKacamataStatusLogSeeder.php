<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsKacamata;
use App\Models\MsKacamataStatusLog;
use App\Models\User;

class MsKacamataStatusLogSeeder extends Seeder
{
    public function run(): void
    {
        $userId = User::inRandomOrder()->first()?->id ?? 1;

        $kacamatas = MsKacamata::all();

        foreach ($kacamatas as $kacamata) {
            MsKacamataStatusLog::create([
                'ms_kacamatas_id' => $kacamata->id,
                'ms_kacamata_statuses_id' => $kacamata->ms_kacamata_statuses_id,
                'user_id' => $userId,
            ]);
        }
    }
}
