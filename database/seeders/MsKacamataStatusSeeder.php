<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MsKacamataStatus;

class MsKacamataStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            ['status' => 'Tersedia', 'description' => 'Siap digunakan'],
            ['status' => 'Dipinjam', 'description' => 'Sedang dipinjam oleh pengguna'],
            ['status' => 'Terjual', 'description' => 'Sudah terjual'],
            ['status' => 'Cacat', 'description' => 'Barang rusak atau tidak layak'],
        ];

        foreach ($statuses as $status) {
            MsKacamataStatus::create($status);
        }
    }
}
