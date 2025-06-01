<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsKacamata extends Model
{
    use HasFactory;

    protected $table = 'ms_kacamatas';

    public function merkRelasi()
    {
        return $this->belongsTo(MsMerk::class, 'ms_merks_id');
    }

    public function laciRelasi()
    {
        return $this->belongsTo(MsLaci::class, 'ms_lacis_id');
    }

    public function statusRelasi()
    {
        return $this->belongsTo(MsKacamataStatus::class, 'ms_kacamata_statuses_id');
    }

    public function statusLogs()
    {
        return $this->hasMany(MsKacamataStatusLog::class, 'ms_kacamatas_id');
    }
}