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
        $user = Auth::user();
    
        // Filtrar las citas según el tipo de usuario
        if ($user->tipo_usuario === 'dueño') {
            // Si el usuario es dueño, filtrar las citas solo de sus mascotas
            $citas = Cita::with('mascota') // Asegúrate de cargar la relación mascota
                           ->whereHas('mascota', function ($query) use ($user) {
                               $query->where('id_usuario', $user->id_usuario);
                           })
                           ->orderBy('fecha', 'desc')
                           ->orderBy('hora', 'desc')
                           ->get();
        } else {
            // Si el usuario no es dueño, obtener todas las citas
            $citas = Cita::orderBy('fecha', 'desc')
                           ->orderBy('hora', 'desc')
                           ->get();
        }
        
        // Obtiene los usuarios con tipo_usuario "dueño" y sus mascotas asociadas
        $duenos = Usuario::select(
                          'id_usuario',
                          'telefono',
                          'email',
                          \DB::raw('CONCAT(nombre, " ", apellidos) AS nombre_completo')
                      )
                      ->where('tipo_usuario', 'dueño')
                      ->with('mascota')  // Cargar las mascotas asociadas al dueño
                      ->get();
    
        // Obtiene los usuarios con tipo_usuario "veterinario"
        $veterinarios = Usuario::select(
                               'id_usuario',
                               'telefono',
                               'email',
                               \DB::raw('CONCAT(nombre, " ", apellidos) AS nombre_completo')
                           )
                           ->where('tipo_usuario', 'veterinario')
                           ->get();
        
        return Inertia::render('Citas', [
            'citas' => $citas,
            'user' => $user,
            'duenos' => $duenos,
            'veterinarios' => $veterinarios,
        ]);
    }
    
    public function store(Request $request)
    {
        // Validar los datos de la solicitud
        $request->validate([
            'duenoId' => 'required|exists:usuarios,id_usuario',
            'id_veterinario' => 'required|exists:usuarios,id_usuario',
            'telefono' => 'required|string|max:255',
            'motivo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'mascotaId' => 'nullable|exists:mascota,id_mascota',
        ]);
    
        // Obtener el usuario autenticado
        $user = Auth::user();
    
        // Verificar que el dueño existe
        $dueno = Usuario::where('id_usuario', $request->duenoId)
                        ->where('tipo_usuario', 'dueño')
                        ->first();
    
        if (!$dueno) {
            return response()->json([
                'error' => 'No se encontró un dueño con el ID proporcionado',
            ], 404);
        }
    
        // Verificar que el veterinario existe
        $veterinario = Usuario::where('id_usuario', $request->id_veterinario)
                              ->where('tipo_usuario', 'veterinario')
                              ->first();
    
        if (!$veterinario) {
            return response()->json([
                'error' => 'No se encontró un veterinario con el ID proporcionado',
            ], 404);
        }
    
        // Verificar si ya existe una cita en la misma fecha y hora
        $existingCita = Cita::where('fecha', $request->fecha)
                            ->where('hora', $request->hora)
                            ->first();
    
        if ($existingCita) {
            return response()->json([
                'error' => 'Ya existe una cita en esa fecha y hora',
            ], 400);
        }
    
        // Crear la nueva cita
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $veterinario->id_usuario,
            'id_mascota' => $request->mascotaId, // Guardar el ID de la mascota si se proporciona
        ]);
        
        // Puedes retornar la nueva cita o una respuesta exitosa aquí
        return response()->json([
            'cita' => $cita
        ]);
    }
}
