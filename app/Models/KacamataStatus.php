<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KacamataStatus extends Model
{
    use HasFactory;

    protected $table = 'ms_kacamata_status';
    protected $primaryKey = 'status';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = ['status', 'description'];
    
    public function kacamatas()
    {
        return $this->hasMany(Kacamata::class, 'status');
    }
    
    public function statusLogs()
    {
        return $this->hasMany(KacamataStatusLog::class, 'status_id');
    }
}