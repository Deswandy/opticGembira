<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laci extends Model
{
    use HasFactory;

    protected $table = 'ms_laci';
    protected $primaryKey = 'laci';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = ['laci', 'description'];
    
    public function kacamatas()
    {
        return $this->hasMany(Kacamata::class, 'laci');
    }
}