<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $table = 'cita';

    protected $fillable = [
        'id_cliente', 
        'id_mascota', 
        'id_veterinario', 
        'id_enfermero', 
        'fecha',
        'temperatura', 
        'id_diagnostico',
        'hora', 
        'motivo'
    ];

    public $timestamps = false;

    public function cliente()
    {
        return $this->belongsTo(Dueno::class, 'id_cliente', 'id_cliente');
    }
}
