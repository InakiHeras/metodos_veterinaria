<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use Inertia\Inertia;
use Carbon\Carbon;

class InicioController extends Controller
{
    public function index()
    {
        // Establece la fecha de hoy en la zona horaria deseada
        $hoy = Carbon::now('America/Mexico_City')->format('Y-m-d');
        $citas = Cita::with('mascota.dueño')
                    ->whereDate('fecha', $hoy)
                    ->get();
    
        return Inertia::render('Inicio', [
            'citas' => $citas,
        ]);
    }

    public function getCitasPorFecha(Request $request)
    {
        $fecha = Carbon::parse($request->query('fecha'), 'America/Mexico_City')->format('Y-m-d');
        \Log::info('Fecha recibida en el backend: ' . $fecha);
    
        $citas = Cita::with('mascota.dueño')
                    ->whereDate('fecha', $fecha)
                    ->get();
    
        return response()->json($citas);
    }
    
}