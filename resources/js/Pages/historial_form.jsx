import React, { useState } from "react";

export default function HistorialForm() {
    const [formData, setFormData] = useState({
        fecha: "",
        medico: "",
        cliente: "",
        mascota: "",
        razon: "",
        diagnostico: "",
        recetas: [{ nombre_medicamento: "" }], // Campo de recetas con un solo campo vacío por defecto
    });

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
        alert("Formulario guardado exitosamente");
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-center text-2xl font-bold mb-6">Formulario de Historial</h1>
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
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
    );
}
