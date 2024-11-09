// app/Http/Controllers/CitaController.php

namespace App\Http\Controllers;

use App\Models\Cita;
use Inertia\Inertia;

class CitaController extends Controller
{
    public function index()
    {
        $citas = Cita::all(); // Obtén todas las citas de la base de datos
        return Inertia::render('Citas', ['citas' => $citas]);
    }
}
