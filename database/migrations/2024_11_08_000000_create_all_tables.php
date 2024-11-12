<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabla de usuarios
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('nombre');
            $table->string('apellidos');
            $table->string('telefono');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('tipo_usuario', ['enfermero', 'veterinario', 'dueño', 'admin']);
            $table->timestamps();
        });

        // Tabla de datos_usuario_tipo
        Schema::create('datos_usuario_tipo', function (Blueprint $table) {
            $table->id('id_datos_usuario');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario')->onDelete('cascade');
            $table->string('especialidad')->nullable();
            $table->string('turno')->nullable();
            $table->string('nocedula')->nullable();
            $table->timestamps();
        });

        // Tabla de mascotas
        Schema::create('mascota', function (Blueprint $table) {
            $table->id('id_mascota');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario')->onDelete('cascade');
            $table->string('nombre');
            $table->string('especie');
            $table->string('raza');
            $table->date('fecha_nacimiento')->nullable();
            $table->decimal('peso', 5, 2)->nullable();
            $table->text('alergias')->nullable();
            $table->boolean('castrado')->default(false);
            $table->timestamps();
        });

        // Tabla de citas
        Schema::create('cita', function (Blueprint $table) {
            $table->id('id_cita');
            $table->foreignId('id_mascota')->constrained('mascota', 'id_mascota')->onDelete('cascade');
            $table->foreignId('id_veterinario')->constrained('usuarios', 'id_usuario')->onDelete('cascade');
            $table->date('fecha');
            $table->time('hora')->nullable();
            $table->text('motivo')->nullable();
            $table->timestamps();
        });

        // Tabla de diagnósticos
        Schema::create('diagnostico', function (Blueprint $table) {
            $table->id('id_diagnostico');
            $table->foreignId('id_cita')->constrained('cita', 'id_cita')->onDelete('cascade');
            $table->text('observaciones');
            $table->string('enfermedad')->nullable();
            $table->timestamps();
        });

        // Tabla de recetas
        Schema::create('recetas', function (Blueprint $table) {
            $table->id('id_receta');
            $table->foreignId('id_diagnostico')->constrained('diagnostico', 'id_diagnostico')->onDelete('cascade');
            $table->string('nombre_medicamento');
            $table->string('frecuencia')->nullable();
            $table->string('via_administracion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recetas');
        Schema::dropIfExists('diagnostico');
        Schema::dropIfExists('cita');
        Schema::dropIfExists('dueno');
        Schema::dropIfExists('mascota');
        Schema::dropIfExists('datos_usuario_tipo');
        Schema::dropIfExists('usuarios');
    }
};
