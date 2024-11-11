<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Dueno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;  // Importa Log para registrar información

class CitasController extends Controller
{
    public function index()
    {
        $citas = Cita::select('id_cita', 'fecha', 'hora', 'motivo')
                     ->orderBy('fecha', 'desc')
                     ->orderBy('hora', 'desc')
                     ->get();

        $user = Auth::user();

        $duenos = Dueno::select(
                'dueno.id_cliente',
                'dueno.id_usuario',
                'usuarios.telefono',
                'usuarios.email',
                \DB::raw('CONCAT(usuarios.nombre, " ", usuarios.apellidos) AS nombre_completo')
            )
            ->join('usuarios', 'usuarios.id_usuario', '=', 'dueno.id_usuario')
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
            'duenoId' => 'required|exists:dueno,id_cliente',
            'telefono' => 'required|string|max:255',
            'mascota' => 'required|string|max:255',
            'motivo' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'raza' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'fecha_nacimiento' => 'nullable|date',
            'peso' => 'nullable|numeric',
            'alergias' => 'nullable|string|max:255',
            'castrado' => 'nullable|boolean',
        ]);
        
        $user = Auth::user();
        $dueno = Dueno::find($request->duenoId);
        
        if (!$dueno) {
            return response()->json(['error' => 'No se encontró un dueño con el ID proporcionado'], 404);
        }
        
        if ($user->telefono !== $request->telefono) {
            $user->telefono = $request->telefono;
            $user->save();
        }
        
        $mascota = Mascota::create([
            'nombre' => $request->mascota,
            'especie' => $request->especie,
            'raza' => $request->raza,
            'id_cliente' => $dueno->id_usuario, 
            'fecha_nacimiento' => $request->fecha_nacimiento ?? null,
            'peso' => $request->peso ?? null,
            'alergias' => $request->alergias ?? null,
            'castrado' => $request->castrado ?? 0,
        ]);
        
        if (!$mascota) {
            return response()->json(['error' => 'Hubo un problema al crear la mascota'], 500);
        }
        
        // Imprimir el id_mascota en los logs (si no se quiere detener el código)
        Log::info('ID de la mascota creada: ' . $mascota->id);
        
        // Si prefieres detener la ejecución y ver el resultado de inmediato, puedes usar dd():
        // dd('ID de la mascota creada: ' . $mascota->id);
        
        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $user->id,
            'id_mascota' => $mascota->id,  // Asegúrate de pasar el ID de la mascota
        ]);
        
        if (!$cita) {
            return response()->json(['error' => 'Hubo un problema al crear la cita'], 500);
        }
        
        // Esto es lo que necesitas, devolver una respuesta Inertia adecuada
        return Inertia::location('/citas'); // Redirige al frontend a la página de citas
    }
}
