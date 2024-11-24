import { useState, useEffect } from 'react';
import Base from './Base';
import '../../css/add_mascotas.css';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

export default function FormDueño() {

    const { usuario_mascota } = usePage().props;
    console.log(usuario_mascota);

    // Estado para los datos del usuario
    /*const [userData, setUserData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
    });*/

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

    /*const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };*/

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            Inertia.post('/mascotas', {
                ...petData,  // Datos de la mascota
                userId,  // ID del dueño
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al agregar la mascota');
        }
        console.log('Datos enviados:', { petData });
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
                                    value={usuario_mascota[0].nombre}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Apellido:</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={usuario_mascota[0].apellidos}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Correo:</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={usuario_mascota[0].email}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Teléfono:</label>
                                <input
                                    type="number"
                                    name="telefono"
                                    value={usuario_mascota[0].telefono}
                                    className="w-full mt-1 p-2 rounded-lg bg-pink-200"
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
