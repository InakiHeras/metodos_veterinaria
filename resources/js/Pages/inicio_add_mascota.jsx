import { useState, useEffect} from 'react';
import Base from './Base';
import '../../css/inicio_add_mascotas.css';
import { usePage } from '@inertiajs/react';

export default function ListaMascotas() {

    const { usuario_mascota } = usePage().props;


    return (
        <Base>
            <div className="inicio_add_mascotas">
                <main className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg mt-8">
                    <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Lista de Mascotas</h1>

                    <table className="w-full bg-pink-100 rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-pink-400 text-white">
                                <th className="px-4 py-2 text-left">Dueño</th>
                                <th className="px-4 py-2 text-left">Mascota</th>
                                <th className="px-4 py-2 text-left">Correo</th>
                                <th className="px-4 py-2 text-left">Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuario_mascota.map((usuario, index) => (
                                <tr
                                    key={usuario.id_usuario}
                                    className={`${
                                        index % 2 === 0 ? 'bg-white' : 'bg-pink-50'
                                    } text-gray-700`}
                                >
                                    <td className="px-4 py-2">{usuario.nombre}</td>
                                    <td className="px-4 py-2">{usuario.mascota}</td>
                                    <td className="px-4 py-2">{usuario.email}</td>
                                    <td className="px-4 py-2">{usuario.telefono}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Botón de agregar */}
                    <div className="flex justify-center mt-8">
                        <button onClick={() => window.location.assign('/add_mascota')} className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition">
                            Agregar Mascota
                        </button>
                    </div>
                </main>
            </div>
        </Base>
    );
};
