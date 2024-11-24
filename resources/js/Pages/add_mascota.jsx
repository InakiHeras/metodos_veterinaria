import { useState, useEffect } from 'react';
import Base from './Base';
import '../../css/add_mascotas.css';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function AddMascota() {

    // Estado para los datos del usuario
    const [userData, setUserData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        telefono: '',
    });

    // Estado para los datos de la mascota
    const [petData, setPetData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        fecha_nacimiento: '',
        //sexo: '',
        peso: '',
        alergias: '',
        castrado: '',
        userId: 1
    });

    const userId = localStorage.getItem('userId');

    // Manejar el cambio de datos de la mascota
    const handlePetChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const fetchUserIdByEmail = async (email) => {
        try {
            console.log(email);
            const response = await axios.post('/usuarios/buscar', { email });
            console.log(response.data);

            if (response.data?.id_usuario) {
                return response.data.id_usuario;
            } else {
                throw new Error('No se encontró el usuario');
            }
        } catch (error) {
            console.error('Error al buscar el ID del usuario:', error);
            alert('No se pudo encontrar un usuario con ese correo.');
            return null;
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // Buscar el ID del usuario usando el correo
            console.log(userData.correo);
            const id_usuario = await fetchUserIdByEmail(userData.correo);

            if (!id_usuario) {
                alert('No se pudo encontrar un usuario con ese correo.');
                return;
            }

            Inertia.post('/mascotas_2', {
                ...petData,  // Datos de la mascota
                id_usuario,  // ID del dueño
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al agregar la mascota');
        }
        console.log('Datos enviados:', { userData, petData });
        alert('¡Mascota agregada exitosamente!');
    };

    return (
        <Base>
        <div className="add_mascotas">
            <main className="w-full max-w-6xl p-0 bg-transparent rounded-lg shadow-none mt-0">
                <h1 className="text-3xl font-bold text-center text-pink-600">Agregar Nueva Mascota</h1>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Datos del dueño */}
                    <section className="bg-pink-100 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-pink-600 mb-4">
                            <legend>Datos del Dueño</legend></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={userData.nombre}
                                    onChange={handleUserChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Apellidos:</label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    value={userData.apellidos}
                                    onChange={handleUserChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Apellidos"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Correo:</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={userData.correo}
                                    onChange={handleUserChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Teléfono:</label>
                                <input
                                    type="number"
                                    name="telefono"
                                    value={userData.telefono}
                                    onChange={handleUserChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Datos de la mascota */}
                    <section className="bg-pink-100 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-pink-600 mb-4">
                            <legend>Datos de la Mascota</legend></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={petData.nombre}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Nombre de la mascota"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Especie:</label>
                                <input
                                    type="text"
                                    name="especie"
                                    value={petData.especie}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Especie"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Raza:</label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={petData.raza}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Raza"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Fecha de nacimiento:</label>
                                <input
                                    type="date"
                                    name="fecha_nacimiento"
                                    value={petData.fecha_nacimiento}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Fecha de nacimiento"
                                />
                            </div>
                            {/*<div>
                                <label className="block font-medium">Sexo:</label>
                                <select
                                    name="sexo"
                                    value={petData.sexo}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                >
                                    <option value="">Selecciona el sexo</option>
                                    <option value="1">Macho</option>
                                    <option value="0">Hembra</option>
                                </select>
                            </div>*/}
                            <div>
                                <label className="block font-medium">Peso:</label>
                                <input
                                    type="float"
                                    name="peso"
                                    value={petData.peso}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Peso"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Alergias:</label>
                                <input
                                    type="text"
                                    name="alergias"
                                    value={petData.alergias}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                    placeholder="Alergias"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Castrado:</label>
                                <select
                                    name="castrado"
                                    value={petData.castrado}
                                    onChange={handlePetChange}
                                    className="w-full mt-1 p-2"
                                >
                                    <option value="">Selecciona castrado</option>
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Botones */}
                    <div className="flex justify-center gap-4">
                        <button type="submit" className="bg-pink-500 text-white px-6 py-2 rounded-full">
                            Guardar
                        </button>
                        <button onClick={() => window.location.assign('/inicio_add_mascota')} type="reset" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full">
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
            </div>
        </Base>
    );
}
