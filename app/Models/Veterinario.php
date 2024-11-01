<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veterinario extends Model
{
    use HasFactory;

    protected $table = 'veterinario';
    protected $primaryKey = 'id_veterinario';

    protected $fillable = [
        'id_usuario',
        'especialidad',
        'turno',
        'noCedula'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
