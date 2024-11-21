<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mascota extends Model
{
    use HasFactory;

    protected $table = 'mascota';
    protected $primaryKey = 'id_mascota';

    protected $fillable = [
        'id_usuario',
        'id_usuario',
        'nombre',
        'especie',
        'raza',
        'fecha_nacimiento',
        //'sexo',
        'peso',
        'alergia',
        'castrado',
    ];

    // Relación con Usuario (Muchos a Uno)
    //public function usuario(): BelongsTo
    //{
    //    return $this->belongsTo(Usuario::class, 'id_cliente');
    //}

    // Relación con Cita (Uno a Muchos)
    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class, 'id_mascota');
    }

     // Relación con Usuario (Muchos a Uno)
    public function dueño(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}