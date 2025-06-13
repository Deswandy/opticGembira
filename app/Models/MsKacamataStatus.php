<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsKacamataStatus extends Model
{
    use HasFactory;

    protected $table = 'ms_kacamata_statuses'; // pastikan nama tabel sesuai

    protected $fillable = [
        'status',
        'description',
    ];

    // Relasi: Satu status bisa dimiliki oleh banyak kacamata
    public function kacamatas()
    {
        return $this->hasMany(MsKacamata::class, 'ms_kacamata_statuses_id');
    }
}
