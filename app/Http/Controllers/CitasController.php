<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CitasController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Filtrar las citas según el tipo de usuario
        if ($user->tipo_usuario === 'dueño') {
            $citas = Cita::with('mascota')
                ->whereHas('mascota', function ($query) use ($user) {
                    $query->where('id_usuario', $user->id_usuario);
                })
                ->orderBy('fecha', 'desc')
                ->orderBy('hora', 'desc')
                ->get();
        } else {
            $citas = Cita::orderBy('fecha', 'desc')
                ->orderBy('hora', 'desc')
                ->get();
        }

        $duenos = Usuario::select(
            'id_usuario',
            'telefono',
            'email',
            \DB::raw('CONCAT(nombre, " ", apellidos) AS nombre_completo')
        )
            ->where('tipo_usuario', 'dueño')
            ->with('mascota')
            ->get();

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
    
        $dueno = Usuario::where('id_usuario', $request->duenoId)
            ->where('tipo_usuario', 'dueño')
            ->first();
    
        $veterinario = Usuario::where('id_usuario', $request->id_veterinario)
            ->where('tipo_usuario', 'veterinario')
            ->first();
    
        if (!$dueno || !$veterinario) {
            return redirect()->back()->with('error', 'Datos inválidos.');
        }
    
        // Verificar si ya existe una cita en la misma fecha y hora
        $existingCita = Cita::where('fecha', $request->fecha)
            ->where('hora', $request->hora)
            ->first();
    
        if ($existingCita) {
            return redirect()->back()->with('error', 'Ya existe una cita en la misma fecha y hora.');
        }
    
        // Crear la nueva cita
        Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $veterinario->id_usuario,
            'id_mascota' => $request->mascotaId,
        ]);
    
        // Redirigir a la lista de citas con un mensaje de éxito
        return redirect()->route('citas.index')->with('success', 'Cita creada exitosamente.');
    }
    

    public function reagendar(Request $request)
    {
        // Validar datos entrantes
        $validated = $request->validate([
            'id_cita' => 'required|exists:cita,id_cita', // Corregido el nombre de la tabla a 'citas'
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);
    
        // Buscar la cita por id
        $cita = Cita::find($request->id_cita);
    
        // Si la cita existe, actualizar los campos
        if ($cita) {
            $cita->update([
                'fecha' => $request->fecha,
                'hora' => $request->hora,
            ]);
    
            // Retornar la vista con el mensaje de éxito y las citas actualizadas
            return Inertia::render('Citas/Index', [
                'message' => 'Cita actualizada correctamente', // Mensaje de éxito
                'citas' => Cita::all(), // Recalcular y pasar las citas actualizadas
            ]);
        }
    
        // Si la cita no se encuentra, devolver el error
        return Inertia::render('Citas/Index', [
            'error' => 'Cita no encontrada',
        ]);
    }

    public function destroy($id)
    {
        // Eliminar la cita
        $cita = Cita::findOrFail($id);
        $cita->delete();
    
        // Redirigir a la vista de citas con un mensaje de éxito
        return Inertia::render('Citas/Index', [
            'message' => 'Cita eliminada con éxito', // El mensaje de éxito
            'citas' => Cita::all(), // Recalcular y pasar las citas restantes
        ]);
    }
}
