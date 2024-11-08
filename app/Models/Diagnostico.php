<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Diagnostico extends Model
{
    use HasFactory;

    protected $table = 'diagnostico';
    protected $primaryKey = 'id_diagnostico';

    protected $fillable = [
        'id_cita',
        'observaciones',
        'enfermedad',
    ];

    // Relación con Cita (Muchos a Uno)
    public function cita(): BelongsTo
    {
        return $this->belongsTo(Cita::class, 'id_cita');
    }

    // Relación con Recetas (Uno a Muchos)
    public function recetas(): HasMany
    {
        return $this->hasMany(Receta::class, 'id_diagnostico');
    }
}

