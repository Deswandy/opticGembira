<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsKacamataStatusLog extends Model
{
    use HasFactory;

    protected $table = 'ms_kacamata_status_logs';
    protected $fillable = [
        'ms_kacamatas_id',
        'ms_kacamata_statuses_id',
        'user_id'
    ];

    public function kacamata()
    {
        return $this->belongsTo(MsKacamata::class, 'ms_kacamatas_id');
    }

public function status()
{
    return $this->belongsTo(\App\Models\MsKacamataStatus::class, 'ms_kacamata_statuses_id');
}

public function user()
{
    return $this->belongsTo(\App\Models\User::class, 'user_id');
}

}