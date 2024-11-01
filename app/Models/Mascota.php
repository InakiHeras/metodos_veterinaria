<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    use HasFactory;

    protected $table = 'mascota';
    protected $primaryKey = 'id_mascota';

    protected $fillable = [
        'nombre',
        'especie',
        'raza',
        'fecha_nacimiento',
        'sexo',
        'peso',
        'alergias',
        'castrado'
    ];

    public function duenos()
    {
        return $this->hasMany(Dueno::class, 'id_mascota');
    }

    public function historialMedico()
    {
        return $this->hasMany(HistorialMedico::class, 'id_mascota');
    }
}
