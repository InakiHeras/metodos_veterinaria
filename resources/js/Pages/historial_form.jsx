import React, { useState } from "react";
import Base from "./Base";
import "../../css/inicio.css"; // Importar estilos generales

export default function HistorialForm({ historial, setHistorial }) {
    const [formData, setFormData] = useState({
        fecha: "",
        medico: "",
        cliente: "",
        mascota: "",
        razon: "",
        diagnostico: "",
        recetas: [{ nombre_medicamento: "" }], // Campo de recetas con un solo campo vacío por defecto
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    // Función para guardar el formulario y actualizar el historial
    const handleSave = () => {
        setLoading(true);
        setError(null);

        try {
            // Validar datos antes de guardar
            if (!formData.fecha || !formData.medico || !formData.cliente || !formData.mascota) {
                throw new Error("Por favor, completa todos los campos obligatorios.");
            }

            // Actualizar el historial con los nuevos datos
            setHistorial((prevHistorial) => [
                ...prevHistorial,
                { ...formData, id: prevHistorial.length + 1 }, // Agregar un ID único
            ]);

            alert("Formulario guardado exitosamente");

            // Reiniciar el formulario
            setFormData({
                fecha: "",
                medico: "",
                cliente: "",
                mascota: "",
                razon: "",
                diagnostico: "",
                recetas: [{ nombre_medicamento: "" }],
            });
        } catch (err) {
            console.error(err);
            setError(err.message || "Hubo un problema al guardar los datos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Base>
            <div className="container mx-auto p-6">
                <h1 className="text-center text-2xl font-bold mb-6">Formulario de Historial</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading && <div className="text-gray-500 mb-4">Guardando...</div>}

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
                <div className="flex justify-end mt-4 space-x-4">
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        disabled={loading}
                    >
                        Guardar
                    </button>
                    <a
                        href="/historial"
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </a>
                </div>
            </div>
        </Base>
    );
}
