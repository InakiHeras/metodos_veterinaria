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

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('dueno');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        // Modificar la tabla 'usuarios'
        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('password')->after('correo');
            $table->enum('tipo_usuario', ['enfermero', 'veterinario', 'dueño'])->after('password');
        });

        // Crear la tabla 'datos_usuario_tipo'
        Schema::create('datos_usuario_tipo', function (Blueprint $table) {
            $table->id('id_datos_usuario');
            $table->integer('id_usuario');
            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->string('especialidad')->nullable();
            $table->string('turno')->nullable();
            $table->string('nocedula')->nullable();
            $table->timestamps();
        });
        
        // Modificar la tabla 'cita'
        Schema::table('cita', function (Blueprint $table) {
            $table->dropForeign('cita_ibfk_4');
            $table->dropColumn('id_enfermero');
            $table->dropForeign('cita_ibfk_3');
            $table->dropColumn('id_veterinario');
            $table->dropForeign('cita_ibfk_1');
            $table->dropColumn('id_cliente');
            $table->integer('id_veterinario');
            $table->foreign('id_veterinario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->dropColumn('peso');
            $table->dropColumn('temperatura');
            $table->time('hora')->nullable()->after('fecha');
            $table->text('motivo')->nullable()->after('hora');
        });

        // Modificar la tabla 'diagnostico' y crear la tabla 'recetas'
        Schema::table('diagnostico', function (Blueprint $table) {
            $table->dropForeign('diagnostico_ibfk_1');
            $table->dropColumn('id_tratamiento');
            $table->integer('id_cita');
            $table->foreign('id_cita')->references('id_consulta')->on('cita')->onDelete('cascade');
        });

        
        Schema::table('tratamiento', function (Blueprint $table) {
            $table->dropForeign('tratamiento_ibfk_1');
            $table->dropForeign('tratamiento_ibfk_2');
            $table->dropColumn('id_historial');
            $table->dropColumn('id_medicamento');
        });

        Schema::table('historialMedico', function (Blueprint $table) {
            $table->dropForeign('historialMedico_ibfk_1');
            $table->dropColumn('id_mascota');
        });

        Schema::create('recetas', function (Blueprint $table) {
            $table->id('id_receta');
            $table->integer('id_diagnostico');
            $table->foreign('id_diagnostico')->references('id_diagnostico')->on('diagnostico')->onDelete('cascade');
            $table->string('nombre_medicamento');
            $table->string('frecuencia')->nullable();
            $table->string('via_administracion')->nullable();
            $table->timestamps();
        });

        // Eliminar tablas innecesarias
        Schema::dropIfExists('enfermero');
        Schema::dropIfExists('veterinario');
        Schema::dropIfExists('dueno');
        Schema::dropIfExists('medicamentos');
        Schema::dropIfExists('tratamiendo');
        Schema::dropIfExists('historialMedico');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restaurar tablas eliminadas
        Schema::create('enfermero', function (Blueprint $table) {
            $table->id('id_enfermero');
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->string('especialidad')->nullable();
            $table->string('turno')->nullable();
            $table->timestamps();
        });

        Schema::create('veterinario', function (Blueprint $table) {
            $table->id('id_veterinario');
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->string('especialidad')->nullable();
            $table->string('turno')->nullable();
            $table->string('noCedula')->nullable();
            $table->timestamps();
        });

        Schema::create('dueno', function (Blueprint $table) {
            $table->id('id_cliente');
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('id_mascota')->constrained('mascota')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('medicamentos', function (Blueprint $table) {
            $table->id('id_medicamento');
            $table->string('nombre');
            $table->string('frecuencia')->nullable();
            $table->string('viaAdministracion')->nullable();
            $table->timestamps();
        });

        // Revertir cambios en la tabla 'usuarios'
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('password');
            $table->dropColumn('tipo_usuario');
        });

        // Eliminar tabla 'datos_usuario_tipo'
        Schema::dropIfExists('datos_usuario_tipo');

        // Revertir cambios en la tabla 'cita'
        Schema::table('cita', function (Blueprint $table) {
            $table->foreignId('id_enfermero')->constrained('usuarios')->onDelete('cascade');
            $table->dropColumn('hora');
            $table->dropColumn('motivo');
        });

        // Revertir cambios en la tabla 'diagnostico' y eliminar 'recetas'
        Schema::table('diagnostico', function (Blueprint $table) {
            $table->foreignId('id_tratamiento')->constrained('tratamiento')->onDelete('cascade');
            $table->dropForeign(['id_cita']);
            $table->dropColumn('id_cita');
        });

        Schema::dropIfExists('recetas');
    }
};
