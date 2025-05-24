<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kacamata extends Model
{
    use HasFactory;

    protected $table = 'ms_kacamata';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'id', 'merk', 'tipe', 'bahan', 'foto', 'status', 'laci'
    ];
    
    public function merkData()
    {
        return $this->belongsTo(Merk::class, 'merk');
    }
    
    public function statusData()
    {
        return $this->belongsTo(KacamataStatus::class, 'status', 'status');
    }
    
    public function laciData()
    {
        return $this->belongsTo(Laci::class, 'laci', 'laci');
    }
    
    public function statusLogs()
    {
        return $this->hasMany(KacamataStatusLog::class, 'kacamata_id');
    }
}