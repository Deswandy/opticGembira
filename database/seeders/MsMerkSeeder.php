<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsMerk;

class MsMerkSeeder extends Seeder
{
    public function run(): void
    {
        $merks = ['Ray-Ban', 'Oakley', 'Gucci', 'Prada', 'Versace'];

        foreach ($merks as $merk) {
            MsMerk::create(['merk' => $merk]);
        }
    }
}
