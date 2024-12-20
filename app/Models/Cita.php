<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cita extends Model
{
    use HasFactory;

    protected $table = 'cita';
    protected $primaryKey = 'id_consulta';

    protected $fillable = [
        'id_cliente',
        'id_mascota',
        'id_veterinario',
        'diagnostico',
        'fecha',
        'hora',
        'motivo',
    ];

    // Relación con Usuario (Muchos a Uno)
    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_cliente');
    }

    public function veterinario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_veterinario');
    }

    // Relación con Mascota (Muchos a Uno)
    public function mascota(): BelongsTo
    {
        return $this->belongsTo(Mascota::class, 'id_mascota');
    }

    // Relación con Diagnostico (Uno a Uno)
    public function diagnostico(): HasOne
    {
        return $this->hasOne(Diagnostico::class, 'id_cita');
    }
}
