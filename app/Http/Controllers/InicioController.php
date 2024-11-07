<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        $hoy = now()->format('Y-m-d');
        $citas = Cita::with('cliente.usuario')
                    ->whereDate('fecha', $hoy)
                    ->get();

        return Inertia::render('Inicio', [
            'citas' => $citas,
        ]);
    }

    public function getCitasPorFecha(Request $request)
    {
        $fecha = $request->query('fecha');
        $citas = Cita::with('cliente.usuario')
                    ->whereDate('fecha', $fecha)
                    ->get();

        return response()->json($citas);
    }
}
