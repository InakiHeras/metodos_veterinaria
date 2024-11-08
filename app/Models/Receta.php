<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Receta extends Model
{
    use HasFactory;

    protected $table = 'recetas';
    protected $primaryKey = 'id_receta';

    protected $fillable = [
        'id_diagnostico',
        'nombre_medicamento',
        'frecuencia',
        'via_administracion',
    ];

    // Relación con Diagnostico (Muchos a Uno)
    public function diagnostico(): BelongsTo
    {
        return $this->belongsTo(Diagnostico::class, 'id_diagnostico');
    }
}

