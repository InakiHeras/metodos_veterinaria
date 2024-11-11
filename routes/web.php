<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

    Route::get('/usuarios/{id}', [UserController::class, 'show'])->name('usuarios.show');

    Route::get('/inicio_add_mascota', [UserController::class, 'index'])->name('inicio_add_mascota');
});



require __DIR__.'/auth.php';
