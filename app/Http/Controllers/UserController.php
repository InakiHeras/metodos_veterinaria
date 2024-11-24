<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Mascota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Usuario::find(Auth::id());
        //$userName = $user-›nombre; // Obtener el nombre del usuario
        //$userRole = $user->getRoleNames()->first();

        $usuario_mascota = Usuario::select('usuarios.id_usuario', 'mascota.nombre as mascota', 'usuarios.nombre', 'usuarios.email', 'usuarios.telefono', 'usuarios.tipo_usuario')
        ->join('mascota', 'usuarios.id_usuario','=','mascota.id_usuario')->where('usuarios.id_usuario', $user->id_usuario)->get();

        return Inertia::render('inicio_add_mascota', ['usuario_mascota' => $usuario_mascota]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario)
    {
        //
    }

    // Método para cargar el formulario de los datos del dueño
    public function showForm()
    {
        /*$user = Auth::user(); // Obtener el usuario autenticado

        // Verificar si el usuario tiene el rol de 'dueño'
        if ($user->hasRole('dueño')) {
            // Si el rol es 'dueño', cargar los datos del usuario
            return Inertia::render('FormDueño', ['usuario' => $user]);
        }

        // Si el usuario no tiene el rol de dueño, redirigir a alguna página
        return redirect()->route('inicio');*/

        $user = Usuario::find(Auth::id());
        //$userName = $user-›nombre; // Obtener el nombre del usuario
        //$userRole = $user->getRoleNames()->first();

        $usuario_mascota = Usuario::select('usuarios.id_usuario', 'mascota.nombre as mascota', 'usuarios.nombre', 'usuarios.apellidos', 'usuarios.email', 'usuarios.telefono', 'usuarios.tipo_usuario')
        ->join('mascota', 'usuarios.id_usuario','=','mascota.id_usuario')->where('usuarios.id_usuario', $user->id_usuario)->get();

        return Inertia::render('FormDueño', ['usuario_mascota' => $usuario_mascota]);
    }

    public function findByEmail(Request $request)
    {

        // Buscar el usuario por correo
        $user = Usuario::select('id_usuario')->where('email', $request->email)->first();

        return response()->json(['id_usuario' => $user->id_usuario], 200);
    }

}
