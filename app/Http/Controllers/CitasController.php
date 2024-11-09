<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use Illuminate\Http\Request;

class CitasController extends Controller
{
    public function index()
    {
        // Obtiene los datos de las citas desde la base de datos
        $citas = Cita::select('id_cita', 'fecha', 'hora', 'motivo')->get();

        // Renderiza la vista 'Citas' con los datos de las citas
        return Inertia::render('Citas', [
            'citas' => $citas
        ]);
    }
}
