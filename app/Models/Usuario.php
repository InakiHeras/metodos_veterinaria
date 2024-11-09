<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Authenticatable
{
    use HasFactory, HasRoles;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'apellidos',
        'telefono',
        'correo',
        'password',
        'tipo_usuario',
    ];

    // Relación con DatosUsuarioTipo (Uno a Uno o Uno a Muchos)
    public function datosUsuarioTipo(): HasMany
    {
        return $this->hasMany(DatosUsuarioTipo::class, 'id_usuario');
    }

    // Relación con Mascota (Uno a Muchos)
    public function mascotas(): HasMany
    {
        return $this->hasMany(Mascota::class, 'id_dueño');
    }

    // Relación con Cita (Uno a Muchos, como veterinario o enfermero)
    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class, 'id_veterinario');
    }

    protected $hidden = [
        'password',
    ];
}

