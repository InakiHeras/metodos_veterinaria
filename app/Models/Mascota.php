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
        'id_cliente',
        'nombre',
        'especie',
        'raza',
        'fecha_nacimiento',
        'peso',
        'alergias',
        'castrado',
    ];

    public function dueno()
    {
        return $this->belongsTo(Dueno::class, 'id_cliente', 'id_cliente');
    }
    

    // Relación con Cita (Uno a Muchos)
    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class, 'id_mascota');
    }
}
