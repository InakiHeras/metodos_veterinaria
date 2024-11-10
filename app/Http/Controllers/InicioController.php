<?php

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
        $citas = Cita::with('mascota.dueño')
                    ->whereDate('fecha', $hoy)
                    ->get();

       
        $user = Usuario::find(Auth::id());
        $userName = $user->nombre; // Obtener el nombre del usuario
        $userRole = $user->getRoleNames()->first(); // Obtener el primer rol del usuario

        return Inertia::render('Inicio', [
            'citas' => $citas,
            'userName' => $userName,
            'userRole' => $userRole,
        ]);
    }
    public function getCitasPorFecha(Request $request)
    {
        $fecha = Carbon::parse($request->query('fecha'), 'America/Mexico_City')->format('Y-m-d');
        Log::info('Fecha recibida en el backend: ' . $fecha);
    
        $citas = Cita::with('mascota.dueño')
                    ->whereDate('fecha', $fecha)
                    ->get();
    
        return response()->json($citas);
    }
    
}