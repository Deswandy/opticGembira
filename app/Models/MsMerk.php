<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsMerk extends Model
{
    use HasFactory;

    protected $table = 'ms_merks';

    protected $fillable = [
        'merk',
    ];

    // Relasi: Satu merk bisa memiliki banyak kacamata
    public function kacamatas()
    {
        return $this->hasMany(MsKacamata::class, 'ms_merks_id');
    }
}
