<?php
// app/Models/KacamataStatusLog.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// In app/Models/KacamataStatusLog.php
class KacamataStatusLog extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'id', 'kacamata_id', 'user_id', 'status_id', 'notes'
    ];
}
