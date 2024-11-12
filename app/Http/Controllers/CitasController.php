<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CitasController extends Controller
{
    public function index()
    {
        $citas = Cita::select('id_cita', 'fecha', 'hora', 'motivo')
                      ->orderBy('fecha', 'desc')
                      ->orderBy('hora', 'desc')
                      ->get();
    
        $user = Auth::user();
    
        // Obtiene los usuarios con tipo_usuario "dueño" y sus mascotas asociadas
        $duenos = Usuario::select(
                 'id_usuario',
                 'telefono',
                 'email',
                 \DB::raw('CONCAT(nombre, " ", apellidos) AS nombre_completo')
             )
             ->where('tipo_usuario', 'dueño')
             ->with('mascotas')  // Cargar las mascotas asociadas al dueño
             ->get();
    
        return Inertia::render('Citas', [
            'citas' => $citas,
            'user' => $user,
            'duenos' => $duenos,
        ]);
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'duenoId' => 'required|exists:usuarios,id_usuario',
            'telefono' => 'required|string|max:255',
            'motivo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);
        
        $user = Auth::user();
        $dueno = Usuario::where('id_usuario', $request->duenoId)
                        ->where('tipo_usuario', 'dueño')
                        ->first();

        if (!$dueno) {
            return response()->json(['error' => 'No se encontró un dueño con el ID proporcionado'], 404);
        }
        
        if ($user->telefono !== $request->telefono) {
            $user->telefono = $request->telefono;
            $user->save();
        }
        
        // Creación de la cita 
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $user->id,
            'id_mascota' => null, // Si id_mascota es opcional en la base de datos
        ]);
        
        if (!$cita) {
            return response()->json(['error' => 'Hubo un problema al crear la cita'], 500);
        }

        return Inertia::location('/citas');
    }
}
