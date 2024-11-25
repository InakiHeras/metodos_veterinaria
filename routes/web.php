<?php

use App\Http\Controllers\HistorialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InicioController;

Route::get('/citas_fecha', [InicioController::class, 'getCitasPorFecha']);

use Illuminate\Http\Request;

use App\Http\Controllers\CitasController;


Route::get('/base', function () {
    return Inertia::render('Base');
});


Route::get('/citas', function () {
    return Inertia::render('Citas');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/inicio', [InicioController::class, 'index'])->name('inicio');
    Route::get('/citas', [CitasController::class, 'index'])->name('citas.index');

    Route::post('/citas', [CitasController::class, 'store']);
    Route::post('/citas/reagendar', [CitasController::class, 'reagendar']);
    // En tu archivo web.php de Laravel
Route::delete('/citas/{id}', [CitasController::class, 'destroy'])->name('citas.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/inicio_add_mascota', function () {
        return Inertia::render('inicio_add_mascota');
    });

    Route::get('/add_mascota', function () {
        return Inertia::render('add_mascota');
    });

    Route::post('/mascotas', [PetController::class, 'store']);
    Route::post('/mascotas_2', [PetController::class, 'store_2']);

    Route::post('/usuarios/buscar', [UserController::class, 'findByEmail']);

    Route::get('/usuarios/{id}', [UserController::class, 'show'])->name('usuarios.show');

    Route::get('/inicio_add_mascota', [UserController::class, 'index'])->name('inicio_add_mascota');


    Route::get('/historial', [HistorialController::class, 'index'])->name('historial');
});

Route::middleware('auth')->group(function () {
    // Ruta para mostrar el formulario de dueño
    Route::get('/FormDueño', [UserController::class, 'showForm'])->name('FormDueño');
});


require __DIR__.'/auth.php';
