<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CitasController extends Controller
{
    public function index()
    {
        // Obtiene los datos de las citas desde la base de datos, ordenados por fecha y luego por hora en orden descendente
        $citas = Cita::select('id_cita', 'fecha', 'hora', 'motivo')
                     ->orderBy('fecha', 'desc')   // Ordena primero por fecha en orden descendente
                     ->orderBy('hora', 'desc')    // Luego ordena por hora en orden descendente dentro de cada fecha
                     ->get();

        // Obtiene el usuario logueado
        $user = Auth::user();

        // Renderiza la vista 'Citas' con los datos de las citas y los datos del usuario
        return Inertia::render('Citas', [
            'citas' => $citas,
            'user' => $user // Agregar datos del usuario para autocompletar el formulario
        ]);
    }

    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'telefono' => 'required|string|max:255',
            'mascota' => 'required|string|max:255',
            'motivo' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'raza' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);

        // Obtener el usuario logueado
        $user = Auth::user();

        // Si el teléfono ha cambiado, lo actualizamos
        if ($user->telefono !== $request->telefono) {
            $user->telefono = $request->telefono;
            $user->save();
        }

        // Crear la mascota
        $mascota = Mascota::create([
            'nombre' => $request->mascota,
            'motivo' => $request->motivo,
            'especie' => $request->especie,
            'raza' => $request->raza,
        ]);

        // Crear la cita
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'usuario_id' => $user->id,   // Relacionamos la cita con el usuario logueado
            'mascota_id' => $mascota->id, // Relacionamos la cita con la mascota creada
        ]);

        // Retornar una respuesta
        return response()->json([
            'message' => 'Cita agendada con éxito',
            'cita' => $cita
        ]);
    }
}
