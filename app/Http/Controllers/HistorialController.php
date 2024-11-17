<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistorialController extends Controller
{
    public function index() 
    {
        // Obtener el usuario autenticado y su rol
        $user = Usuario::find(Auth::id());
        $userRole = $user->getRoleNames()->first(); // Obtener el primer rol del usuario

        // Variable para almacenar el historial filtrado
        $historial = [];

        if ($userRole === 'veterinario') {
            // Historial para veterinarios: citas donde es el veterinario
            $historial = Cita::with([
                'mascota' => function ($query) {
                    $query->select('id_mascota', 'nombre', 'especie', 'raza', 'id_usuario')
                          ->with('dueño:id_usuario,nombre,apellidos'); // Carga el dueño relacionado
                },
                'diagnostico:id_diagnostico,id_cita,observaciones', // Diagnóstico
                'diagnostico.recetas:id_receta,id_diagnostico,nombre_medicamento', // Recetas
            ])
            ->where('id_veterinario', $user->id_usuario)
            ->get();
        } elseif ($userRole === 'dueño') {
            // Historial para dueños: citas relacionadas con sus mascotas
            $historial = Cita::with([
                'mascota' => function ($query) {
                    $query->select('id_mascota', 'nombre', 'especie', 'raza', 'id_usuario')
                          ->with('dueño:id_usuario,nombre,apellidos'); // Carga el dueño relacionado
                },
                'diagnostico:id_diagnostico,id_cita,observaciones', // Diagnóstico
                'diagnostico.recetas:id_receta,id_diagnostico,nombre_medicamento', // Recetas
            ])
                ->whereHas('mascota', function ($query) use ($user) {
                    $query->where('id_usuario', $user->id_usuario);
                })
                ->get();
        }

        // Formatear el historial
        $formattedHistorial = collect($historial)->map(function ($cita) {
            return [
                'fecha' => $cita->fecha,
                'hora' => $cita->hora,
                'razon' => $cita->motivo,
                'veterinario' => $cita->veterinario ? $cita->veterinario->nombre . ' ' . $cita->veterinario->apellidos : null,
                'cliente' => $cita->mascota->dueño ? $cita->mascota->dueño->nombre . ' ' . $cita->mascota->dueño->apellidos : null,
                'mascota' => $cita->mascota ? $cita->mascota->nombre : null,
                'diagnostico' => $cita->diagnostico ? $cita->diagnostico->observaciones : null,
                'recetas' => $cita->diagnostico && $cita->diagnostico->recetas ? $cita->diagnostico->recetas->map(function ($receta) {
                    return [
                        'id_receta' => $receta->id_receta,
                        'nombre_medicamento' => $receta->nombre_medicamento,
                        'frecuencia' => $receta->frecuencia,
                        'via_administracion' => $receta->via_administracion,
                    ];
                }) : [],
            ];
        });

        // Retornar datos a la vista
        return Inertia::render('Historial', [
            'historial' => $formattedHistorial,
            'userRole' => $userRole,
        ]);
    }
}
