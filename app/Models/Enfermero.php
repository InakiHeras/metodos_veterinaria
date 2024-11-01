<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enfermero extends Model
{
    use HasFactory;

    protected $table = 'enfermero';
    protected $primaryKey = 'id_enfermero';

    protected $fillable = [
        'id_usuario',
        'especialidad',
        'turno'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
