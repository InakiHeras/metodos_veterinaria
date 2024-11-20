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

        $usuario_mascota = Usuario::select('usuarios.id_usuario', 'mascota.nombre as mascota', 'usuarios.nombre', 'usuarios.email', 'usuarios.telefono')
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
}
