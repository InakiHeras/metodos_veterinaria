<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InicioController;

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
    Route::get('/citas', [CitasController::class, 'index']);

    Route::post('/citas', [CitasController::class, 'store']);
    Route::post('/citas/reagendar', [CitasController::class, 'reagendar']);
    // En tu archivo web.php de Laravel
Route::delete('/citas/{id}', [CitasController::class, 'destroy'])->name('citas.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';

