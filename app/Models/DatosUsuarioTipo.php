<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DatosUsuarioTipo extends Model
{
    use HasFactory;

    protected $table = 'datos_usuario_tipo';
    protected $primaryKey = 'id_datos_usuario';

    protected $fillable = [
        'id_usuario',
        'especialidad',
        'turno',
        'nocedula',
    ];

    // Relación con Usuario (Muchos a Uno)
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
