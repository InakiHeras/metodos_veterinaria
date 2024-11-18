import React, { useState } from "react";
import Base from "./Base";
import "../../css/inicio.css"; // Importar estilos generales

export default function Historial({ historial }) {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

    const [formData, setFormData] = useState({
        fecha: "",
        medico: "",
        cliente: "",
        mascota: "",
        razon: "",
        diagnostico: "",
        recetas: [{ nombre_medicamento: "" }], // Campo de recetas con un solo campo vacío por defecto
    });

    // Filtrar el historial según el término de búsqueda
    const filteredHistorial = historial.filter((item) => {
        const searchIn = `${item.fecha} ${item.diagnostico} ${item.razon} ${item.veterinario} ${item.cliente} ${item.mascota}`;
        return searchIn.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Manejar el cambio en las recetas
    const handleRecetaChange = (index, e) => {
        const newRecetas = [...formData.recetas];
        newRecetas[index].nombre_medicamento = e.target.value;
        setFormData({
            ...formData,
            recetas: newRecetas,
        });
    };

    // Agregar una receta más
    const addReceta = () => {
        setFormData({
            ...formData,
            recetas: [...formData.recetas, { nombre_medicamento: "" }],
        });
    };

    // Eliminar una receta
    const removeReceta = (index) => {
        const newRecetas = formData.recetas.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            recetas: newRecetas,
        });
    };

    // Función para guardar el formulario
    const handleSave = () => {
        console.log("Formulario guardado", formData);
        closeModal();
    };

    return (
        <Base>
            <div className="container">
                <div className="p-6 bg-white bg-opacity-90 min-h-screen">
                    <div className="flex justify-end items-center mb-4">
                        {/* Campo de búsqueda */}
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-xs px-6 py-3 border-none rounded-full bg-pink-200 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg mb-20">
                        <table className="w-full text-left border-collapse table-auto">
                            <thead className="bg-pink-200 text-pink-800 sticky top-0 z-10">
                                <tr>
                                    <th className="p-2 border border-gray-300">ID</th>
                                    <th className="p-2 border border-gray-300">Fecha de cita</th>
                                    <th className="p-2 border border-gray-300">Receta</th>
                                    <th className="p-2 border border-gray-300">Diagnóstico</th>
                                    <th className="p-2 border border-gray-300">Razón</th>
                                    <th className="p-2 border border-gray-300">Médico</th>
                                    <th className="p-2 border border-gray-300">Cliente / Mascota</th>
                                    <th className="p-2 border border-gray-300 text-center">Historial PDF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistorial.length > 0 ? (
                                    filteredHistorial.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-pink-50">
                                            <td className="p-2 border border-gray-300">{index + 1}</td>
                                            <td className="p-2 border border-gray-300">{item.fecha}</td>
                                            <td className="p-2 border border-gray-300">
                                                <ul className="list-disc ml-4">
                                                    {item.recetas.map((receta, recetaIndex) => (
                                                        <li key={recetaIndex}>
                                                            <span className="font-bold">
                                                                {receta.nombre_medicamento}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="p-2 border border-gray-300">{item.diagnostico}</td>
                                            <td className="p-2 border border-gray-300">{item.razon}</td>
                                            <td className="p-2 border border-gray-300">{item.veterinario}</td>
                                            <td className="p-2 border border-gray-300">
                                                {item.cliente}: {item.mascota}
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                {/* Reemplazar botón con imagen */}
                                                <img
                                                    src="/assets/descarga.svg"
                                                    alt="Descargar PDF"
                                                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-4 text-gray-500">
                                            No hay datos disponibles
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Botón "Agregar" */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-all"
                            onClick={openModal}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className="bg-cover bg-center p-6 rounded-lg shadow-lg max-w-2xl w-full"
                        style={{
                            backgroundImage: "url('/assets/formulario.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <h2 className="text-center text-lg font-bold text-white mb-4">Formulario</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {/* Campos del formulario en dos columnas */}
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="medico"
                                placeholder="Médico"
                                value={formData.medico}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="cliente"
                                placeholder="Cliente"
                                value={formData.cliente}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="mascota"
                                placeholder="Mascota"
                                value={formData.mascota}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="razon"
                                placeholder="Razón"
                                value={formData.razon}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="diagnostico"
                                placeholder="Diagnóstico"
                                value={formData.diagnostico}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>

                        <div className="space-y-4 mb-4">
                            {formData.recetas.map((receta, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="text"
                                        name={`receta-${index}`}
                                        value={receta.nombre_medicamento}
                                        onChange={(e) => handleRecetaChange(index, e)}
                                        placeholder="Nombre de medicamento"
                                        className="w-full px-4 py-2 border rounded mr-2"
                                    />
                                    <button
                                        onClick={() => removeReceta(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Eliminar receta
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addReceta}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Agregar receta
                            </button>
                        </div>

                        {/* Botones Guardar y Cancelar */}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Base>
    );
}
