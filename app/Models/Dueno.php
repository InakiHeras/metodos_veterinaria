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
    ];

// En el modelo Dueno.php
public function usuario()
{
    // Relación inversa: un Dueno pertenece a un Usuario
    return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
}

}

