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
            return response()->json(['error' => 'Datos inválidos'], 404);
        }

        // Verificar si ya existe una cita en la misma fecha y hora
        $existingCita = Cita::where('fecha', $request->fecha)
            ->where('hora', $request->hora)
            ->first();

        if ($existingCita) {
            return response()->json(['error' => 'Cita duplicada'], 400);
        }

        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'motivo' => $request->motivo,
            'id_veterinario' => $veterinario->id_usuario,
            'id_mascota' => $request->mascotaId,
        ]);

        return response()->json(['cita' => $cita]);
    }

    public function reagendar(Request $request)
    {
        // Validar datos entrantes
        $validated = $request->validate([
            'id_cita' => 'required|exists:cita,id_cita',  // Asegurarse de que id_cita exista
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            //'id_veterinario' => 'required|exists:veterinario,id_veterinario',
        ]);
    
        // Buscar la cita por id
        $cita = Cita::find($request->id_cita);
    
        // Si la cita existe, actualizar los campos
        if ($cita) {
            $cita->update([
                'fecha' => $request->fecha,
                'hora' => $request->hora,
                //'id_veterinario' => $request->id_veterinario,
            ]);
    
            return response()->json(['message' => 'Cita actualizada correctamente']);
        }
    
        return response()->json(['error' => 'Cita no encontrada'], 404);
    }

    public function destroy($id)
{
    $cita = Cita::findOrFail($id);
    $cita->delete();

    return response()->json(['message' => 'Cita eliminada con éxito']);
}

    
}
