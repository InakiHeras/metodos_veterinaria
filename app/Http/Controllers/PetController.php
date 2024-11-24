<?php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */



    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Crear la mascota

        $user = Usuario::find(Auth::id());

        $pet = Mascota::create([
            'nombre' => $request->nombre,
            'especie' => $request->especie,
            'raza' => $request->raza,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            //'sexo' => $request->sexo,
            'peso' => $request->peso,
            'alergias' => $request->alergias,
            'castrado' => $request->castrado,
            'id_usuario' => $user->id_usuario,  // Usar el userId para asociar la mascota
        ]);

        // Retornar la respuesta como JSON, ya que Inertia trabaja con JSON
        //return response()->json(['mascota' => $pet]);
    }

    public function store_2(Request $request)
    {
        // Crear la mascota

        // $user = Usuario::find(Auth::id());

        $pet = Mascota::create([
            'nombre' => $request->nombre,
            'especie' => $request->especie,
            'raza' => $request->raza,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            //'sexo' => $request->sexo,
            'peso' => $request->peso,
            'alergias' => $request->alergias,
            'castrado' => $request->castrado,
            'id_usuario' => $request->id_usuario,  // Usar el userId para asociar la mascota
        ]);

        // Retornar la respuesta como JSON, ya que Inertia trabaja con JSON
        //return response()->json(['mascota' => $pet]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mascota $mascota)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mascota $mascota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mascota $mascota)
    {
        //
    }
}
