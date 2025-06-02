<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsLaci extends Model
{
    use HasFactory;

    protected $table = 'ms_lacis';

    protected $fillable = [
        'laci',
    ];

    // Relasi: Satu laci bisa menyimpan banyak kacamata
    public function kacamatas()
    {
        return $this->hasMany(MsKacamata::class, 'ms_lacis_id');
    }
}
