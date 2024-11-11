<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Esto está bien, no lo cambies
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Authenticatable // La clase debe llamarse "Usuario"
{
    use HasFactory, HasRoles;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'apellidos',
        'telefono',
        'email',
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
        return $this->hasMany(Mascota::class, 'id_cliente');
    }

    // Relación con Cita (Uno a Muchos, como veterinario o enfermero)
    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class, 'id_veterinario');
    }

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

// En el modelo Usuario.php
public function dueno()
{
    // Aquí estableces que un usuario puede tener un dueño relacionado
    return $this->hasOne(Dueno::class, 'id_usuario', 'id_usuario');
}

}

