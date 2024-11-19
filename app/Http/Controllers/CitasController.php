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
            'veterinarioId' => 'required|exists:usuarios,id_usuario', // Veterinario agregado
            'telefono' => 'required|string|max:255',
            'motivo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);
    
        // Obtener el usuario autenticado
        $user = Auth::user();
    
        // Verificar que el dueño existe
        $dueno = Usuario::where('id_usuario', $request->duenoId)
                         ->where('tipo_usuario', 'dueño')
                         ->first();
    
        if (!$dueno) {
            return response()->json(['error' => 'No se encontró un dueño con el ID proporcionado'], 404);
        }
    
        // Verificar que el veterinario existe
        $veterinario = Usuario::where('id_usuario', $request->veterinarioId)
                               ->where('tipo_usuario', 'veterinario')
                               ->first();
    
        if (!$veterinario) {
            return response()->json(['error' => 'No se encontró un veterinario con el ID proporcionado'], 404);
        }
    
        // Verificar si el teléfono proporcionado es diferente al registrado del usuario
        if ($user->telefono !== $request->telefono) {
            $user->telefono = $request->telefono;
            $user->save();
        }
    
        // Verificar si ya existe una cita en la misma fecha y hora
        $existingCita = Cita::where('fecha', $request->fecha)
                            ->where('hora', $request->hora)
                            ->first();
    
        if ($existingCita) {
            return response()->json(['error' => 'Ya existe una cita en esa fecha y hora'], 409);
        }
    
        // Crear la nueva cita
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $veterinario->id_usuario,  // Asociar con el veterinario
            'id_mascota' => null, // Si id_mascota es opcional en la base de datos
        ]);
    
        // Verificar si la cita fue creada correctamente
        if (!$cita) {
            return response()->json(['error' => 'Hubo un problema al crear la cita'], 500);
        }
    
        // Redirigir a la página de citas
        return Inertia::location('/citas');
    }

    public function getAvailableDates()
    {
        // Suponiendo que cada cita tiene un campo `fecha` y `hora`
        $allDates = Cita::select('fecha')
            ->whereBetween('hora', ['09:00:00', '21:00:00'])
            ->groupBy('fecha')
            ->havingRaw('COUNT(*) < 12') // Suponiendo 12 citas como el límite de disponibilidad por día
            ->pluck('fecha');

        return response()->json($allDates);
    }

    public function getAvailableHours($fecha)
    {
        $allHours = [
            '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
            '17:00', '18:00', '19:00', '20:00', '21:00'
        ];

        $bookedHours = Cita::where('fecha', $fecha)->pluck('hora')->toArray();
        $availableHours = array_diff($allHours, $bookedHours);

        return response()->json($availableHours);
    }
}
