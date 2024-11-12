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
         // Definir roles que se necesitan
         $roles = [
            'admin',
            'veterinario',
            'enfermero',
            'dueño',
        ];

        // Crear roles si no existen
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Obtener todos los usuarios y asignarles roles según su tipo_usuario
        $users = Usuario::all();

        foreach ($users as $user) {
            switch ($user->tipo_usuario) {
                case 'admin':
                    $user->assignRole('admin');
                    break;
                case 'veterinario':
                    $user->assignRole('veterinario');
                    break;
                case 'enfermero':
                    $user->assignRole('enfermero');
                    break;
                case 'dueño':
                    $user->assignRole('dueño');
                    break;
                default:
                    // No hacer nada si no tiene un tipo_usuario válido
                    break;
            }
        }
    }
}
