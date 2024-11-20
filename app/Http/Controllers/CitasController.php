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
            'veterinarios' => $veterinarios,  // Pasamos los veterinarios también
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
            return Inertia::render('Citas', [
                'error' => 'No se encontró un dueño con el ID proporcionado',
            ]);
        }
    
        // Verificar que el veterinario existe
        $veterinario = Usuario::where('id_usuario', $request->id_veterinario)
                              ->where('tipo_usuario', 'veterinario')
                              ->first();
    
        if (!$veterinario) {
            return Inertia::render('Citas', [
                'error' => 'No se encontró un veterinario con el ID proporcionado',
            ]);
        }
    
        // Verificar si ya existe una cita en la misma fecha y hora
        $existingCita = Cita::where('fecha', $request->fecha)
                            ->where('hora', $request->hora)
                            ->first();
    
        if ($existingCita) {
            return Inertia::render('Citas', [
                'error' => 'Ya existe una cita en esa fecha y hora',
            ]);
        }
    
        // Crear la nueva cita
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $veterinario->id_usuario,
            'id_dueno' => $dueno->id_usuario,
            'id_mascota' => $request->mascotaId, // Guardar el ID de la mascota si se proporciona
        ]);
    }
    

}
