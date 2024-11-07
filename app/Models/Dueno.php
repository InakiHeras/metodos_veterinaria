<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dueno extends Model
{
    use HasFactory;

    protected $table = 'dueno';
    protected $primaryKey = 'id_cliente';

    protected $fillable = [
        'id_usuario',
        'id_mascota'
    ];

    // Dueno.php
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }


    public function mascota()
    {
        return $this->belongsTo(Mascota::class, 'id_mascota');
    }
}
