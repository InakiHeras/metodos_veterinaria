<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class InicioController extends Controller
{
    public function index()
    {
        // Establece la fecha de hoy en la zona horaria deseada
        $hoy = Carbon::now('America/Mexico_City')->format('Y-m-d');

        // Obtiene el usuario logueado
        $user = Auth::user(); // Obtener el usuario autenticado
        $userRole = $user->getRoleNames()->first(); // Obtener el primer rol del usuario

        // Filtrar citas dependiendo del rol del usuario
        if ($userRole === 'veterinario') {
            // Filtrar citas para veterinario logueado
            $citas = Cita::with(['mascota.dueño']) // Cargar relaciones necesarias
                ->where('id_veterinario', $user->id_usuario)
                ->whereDate('fecha', $hoy)
                ->get();
        } else {
            // Si el rol es 'dueño', se filtran las citas de las mascotas de ese dueño
            $citas = Cita::with(['mascota.dueño'])
                ->whereHas('mascota.dueño', function ($query) use ($user) {
                    $query->where('id_usuario', $user->id_usuario); // Filtrar por id_usuario del dueño
                })
                ->whereDate('fecha', $hoy)
                ->get();
        }

        return Inertia::render('Inicio', [
            'citas' => $citas,
            'userName' => $user->nombre,
            'userRole' => $userRole,
        ]);
    }

    public function getCitasPorFecha(Request $request)
    {
        // Obtener la fecha desde la petición
        $fecha = Carbon::parse($request->query('fecha'), 'America/Mexico_City')->format('Y-m-d');
        Log::info('Fecha recibida en el backend: ' . $fecha);

        // Filtrar citas dependiendo del rol del usuario
        $user = Auth::user();
        if ($user->hasRole('veterinario')) {
            $citas = Cita::with(['mascota.dueño'])
                ->where('id_veterinario', $user->id_usuario)
                ->whereDate('fecha', $fecha)
                ->get();
        } else {
            $citas = Cita::with(['mascota.dueño'])
                ->whereHas('mascota.dueño', function ($query) use ($user) {
                    $query->where('id_usuario', $user->id_usuario);
                })
                ->whereDate('fecha', $fecha)
                ->get();
        }

        return response()->json($citas);
    }
}

