<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Usuario;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = Usuario::create([
            'nombre' => 'Admin',
            'apellidos' => 'User',
            'telefono' => '1234567890',
            'correo' => 'admin@example.com',
            'password' => Hash::make('1234'),
            'tipo_usuario' => 'admin'
        ]);

        $role = Role::create(['name' => 'admin']);

        $user->assignRole('admin');
    }
}
