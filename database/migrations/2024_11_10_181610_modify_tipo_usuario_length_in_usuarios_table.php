<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('tipo_usuario', 20)->change(); // Ajusta la longitud según sea necesario
        });
    }
    
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('tipo_usuario', 10)->change(); // Longitud original si era de 10
        });
    }
    
};
