<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Disable foreign key checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        
        // Truncate tables in correct order (child tables first)
        DB::table('kacamata_status_logs')->truncate();
        DB::table('ms_kacamata')->truncate();
        DB::table('ms_user')->truncate();
        DB::table('ms_merk')->truncate();
        DB::table('ms_laci')->truncate();
        DB::table('ms_kacamata_status')->truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // 1. Seed Kacamata Statuses
        $statuses = [
            ['status' => 'in_stock', 'description' => 'Kacamata tersedia'],
            ['status' => 'sold', 'description' => 'Kacamata terjual'],
            ['status' => 'repair', 'description' => 'Kacamata dalam perbaikan'],
            ['status' => 'ordered', 'description' => 'Kacamata dipesan'],
            ['status' => 'returned', 'description' => 'Kacamata dikembalikan'],
        ];
        DB::table('ms_kacamata_status')->insert($statuses);

        // 2. Seed Drawers (Laci)
        $lacis = [
            ['laci' => 'A1', 'description' => 'Laci A1 - Frame Metal'],
            ['laci' => 'A2', 'description' => 'Laci A2 - Frame Plastik'],
            ['laci' => 'B1', 'description' => 'Laci B1 - Sunglasses'],
            ['laci' => 'B2', 'description' => 'Laci B2 - Reading Glasses'],
            ['laci' => 'C1', 'description' => 'Laci C1 - Premium Collection'],
        ];
        DB::table('ms_laci')->insert($lacis);

        // 3. Seed Brands (Merk)
        $merkData = ['Ray-Ban', 'Oakley', 'Gucci', 'Prada', 'Versace', 'Police', 'Vogue', 'Local Brand'];
        $merks = array_map(function ($merk) {
            return [
                'id' => Str::uuid(),
                'merk' => $merk,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }, $merkData);
        DB::table('ms_merk')->insert($merks);

        // 4. Seed Users
        $users = [
            [
                'id' => Str::uuid(),
                'nama' => 'Admin Utama',
                'email' => 'admin@tokokacamata.com',
                'role' => 'superadmin',
                'password' => bcrypt('password123'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'nama' => 'Karyawan 1',
                'email' => 'karyawan1@tokokacamata.com',
                'role' => 'karyawan',
                'password' => bcrypt('password123'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'nama' => 'Karyawan 2',
                'email' => 'karyawan2@tokokacamata.com',
                'role' => 'karyawan',
                'password' => bcrypt('password123'),
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        DB::table('ms_user')->insert($users);

        // 5. Seed Glasses (Kacamata)
        $kacamatas = [];
        $laciValues = DB::table('ms_laci')->pluck('laci')->toArray();
        $statusValues = DB::table('ms_kacamata_status')->pluck('status')->toArray();
        $merkIds = DB::table('ms_merk')->pluck('id')->toArray();
        
        $bahanOptions = ['Metal', 'Plastik', 'Titanium', 'Campuran'];
        $jenisLensa = ['Progressive', 'Single Vision', 'Bifocal', 'Photochromic'];

        foreach (range(1, 50) as $i) {
            $laci = $laciValues[array_rand($laciValues)];
            $kacamatas[] = [
                'id' => $laci . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'merk' => $merkIds[array_rand($merkIds)],
                'tipe' => $faker->unique()->bothify('Model-###??'),
                'bahan' => $bahanOptions[array_rand($bahanOptions)],
                'jenis_lensa' => $jenisLensa[array_rand($jenisLensa)],
                'harga' => $faker->numberBetween(500000, 5000000),
                'foto' => null,
                'status' => $statusValues[array_rand($statusValues)],
                'laci' => $laci,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now(),
            ];
        }
        
        foreach (array_chunk($kacamatas, 20) as $chunk) {
            DB::table('ms_kacamata')->insert($chunk);
        }

        // 6. Seed Status Logs - Updated with proper UUID handling
        $statusLogs = [];
        $kacamataIds = DB::table('ms_kacamata')->pluck('id')->toArray();
        $userIds = DB::table('ms_user')->pluck('id')->toArray();
        
        foreach ($kacamataIds as $kacamataId) {
            $logCount = rand(1, 5);
            $currentStatus = DB::table('ms_kacamata')->where('id', $kacamataId)->value('status');
            
            for ($i = 0; $i < $logCount; $i++) {
                $statusLogs[] = [
                    'id' => Str::uuid()->toString(), // Ensure proper UUID format
                    'kacamata_id' => $kacamataId,
                    'status_id' => $i === ($logCount - 1) ? $currentStatus : $statusValues[array_rand($statusValues)],
                    'user_id' => $userIds[array_rand($userIds)],
                    'notes' => $faker->sentence(6),
                    'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => now(),
                ];
            }
        }
        
        // Insert logs in smaller batches
        foreach (array_chunk($statusLogs, 25) as $chunk) {
            DB::table('kacamata_status_logs')->insert($chunk);
        }
        
        $this->command->info('Database seeded successfully!');
    }
}