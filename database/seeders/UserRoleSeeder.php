<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear los roles de 'veterinario' y 'dueño' si no existen
        $veterinarioRole = Role::firstOrCreate(['name' => 'veterinario']);
        $duenoRole = Role::firstOrCreate(['name' => 'dueño']);


        $veterinario2 = Usuario::create([
            'nombre' => 'Pedro',
            'apellidos' => 'Zoydo',
            'telefono' => '0987654321',
            'email' => 'pedro.zoydo@example.com',
            'password' => Hash::make('password'),
            'tipo_usuario' => 'veterinario'
        ]);
        $veterinario2->assignRole('veterinario');

        // Crear un usuario con el rol de 'dueño'
        $dueno = Usuario::create([
            'nombre' => 'Luis',
            'apellidos' => 'Ramirez',
            'telefono' => '1122334455',
            'email' => 'luis.ramirez@example.com',
            'password' => Hash::make('password'),
            'tipo_usuario' => 'dueño'
        ]);
        $dueno->assignRole('dueño');
    }
}
