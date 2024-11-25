import React, { useState } from "react";
import Base from "./Base";
import "../../css/inicio.css";

// Componente hijo para entradas de recetas
const RecetaInput = ({ receta, index, onChange, onRemove }) => (
    <div className="flex items-center gap-2 mb-2">
        <input
            type="text"
            value={receta.nombre_medicamento}
            onChange={(e) => onChange(index, "nombre_medicamento", e.target.value)}
            placeholder="Medicamento"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/3"
        />
        <input
            type="text"
            value={receta.dosis}
            onChange={(e) => onChange(index, "dosis", e.target.value)}
            placeholder="Dosis"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/4"
        />
        <input
            type="text"
            value={receta.tiempo}
            onChange={(e) => onChange(index, "tiempo", e.target.value)}
            placeholder="Tiempo"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/4"
        />
        <button
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
            X
        </button>
    </div>
);

export default function HistorialForm({ historial, setHistorial, citas, userRole }) {
    console.log("Citas disponibles:", citas);

    const initialFormData = {
        id: "",
        fecha: "",
        medico: "",
        cliente: "",
        mascota: "",
        razon: "",
        diagnostico: "",
        recetas: [{ nombre_medicamento: "", dosis: "", tiempo: "" }],
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectIdCita = (idCita) => {
        const citaSeleccionada = citas.find((cita) => cita.id_cita === parseInt(idCita, 10));
        if (citaSeleccionada) {
            setFormData({
                ...formData,
                id: citaSeleccionada.id_cita,
                fecha: citaSeleccionada.fecha,
                medico: `${citaSeleccionada.veterinario?.nombre || "No especificado"} ${citaSeleccionada.veterinario?.apellidos || ""}`.trim(),
                mascota: citaSeleccionada.mascota?.nombre || "No especificado",
            });
        }
    };

    const handleRecetaChange = (index, field, value) => {
        const newRecetas = [...formData.recetas];
        newRecetas[index][field] = value;
        setFormData({
            ...formData,
            recetas: newRecetas,
        });
    };

    const addReceta = () => {
        setFormData({
            ...formData,
            recetas: [...formData.recetas, { nombre_medicamento: "", dosis: "", tiempo: "" }],
        });
    };

    const removeReceta = (index) => {
        const newRecetas = formData.recetas.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            recetas: newRecetas,
        });
    };

    const isFormValid = () => {
        const { id, fecha, medico, cliente, mascota, diagnostico, recetas } = formData;
        if (!id || !fecha || !medico || !cliente || !mascota || !diagnostico) return false;
        return recetas.every(
            (receta) =>
                receta.nombre_medicamento.trim() &&
                receta.dosis.trim() &&
                receta.tiempo.trim()
        );
    };

    const resetForm = () => setFormData(initialFormData);

    const handleSave = () => {
        if (!isFormValid()) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }
        const newHistorial = { ...formData, id: Date.now() }; // Generar ID único
        setHistorial((prev) => [...prev, newHistorial]);
        alert("Formulario guardado exitosamente");
        resetForm();
    };

    return (
        <Base>
            <div
                className="flex items-center justify-center min-h-screen"
                style={{
                    backgroundColor: "#f3f4f6",
                    padding: "20px",
                }}
            >
                <div
                    className="rounded-lg shadow-lg"
                    style={{
                        width: "90vw",
                        maxWidth: "1200px",
                        minHeight: "85vh",
                        backgroundImage: "url('/assets/formulario.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        transform: "translateX(10%)",
                    }}
                >
                    <div
                        className="text-center text-white font-bold text-3xl py-4"
                        style={{
                            backgroundColor: "#d91e70",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                        }}
                    >
                        Receta Médica
                    </div>

                    <div className="p-8">
                        {/* Fila ID y Fecha */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex flex-col">
                                <label htmlFor="id" className="font-semibold mb-1 text-gray-700">
                                    ID Cita
                                </label>
                                <select
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={(e) => handleSelectIdCita(e.target.value)}
                                    className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                                >
                                    <option value="">Seleccionar un ID</option>
                                    {citas.map((cita) => (
                                        <option key={cita.id_cita} value={cita.id_cita}>
                                            {`ID: ${cita.id_cita} - ${cita.fecha} (${cita.motivo})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col items-end">
                                <label htmlFor="fecha" className="font-semibold mb-1 text-gray-700">
                                    Fecha
                                </label>
                                <input
                                    id="fecha"
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Fila Médico */}
                        <div className="flex flex-col items-center mb-6">
                            <label htmlFor="medico" className="font-semibold mb-1 text-gray-700 text-center">
                                Médico
                            </label>
                            <input
                                id="medico"
                                type="text"
                                name="medico"
                                value={formData.medico}
                                onChange={handleChange}
                                placeholder="Nombre del médico"
                                className="border rounded px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                readOnly
                            />
                        </div>

                        {/* Fila Mascota y Diagnóstico */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex flex-col">
                                <label htmlFor="mascota" className="font-semibold mb-1 text-gray-700">
                                    Mascota
                                </label>
                                <input
                                    id="mascota"
                                    type="text"
                                    name="mascota"
                                    value={formData.mascota}
                                    onChange={handleChange}
                                    placeholder="Nombre de la mascota"
                                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full mb-4"
                                    readOnly
                                />
                                <label htmlFor="diagnostico" className="font-semibold mb-1 text-gray-700">
                                    Diagnóstico
                                </label>
                                <textarea
                                    id="diagnostico"
                                    name="diagnostico"
                                    value={formData.diagnostico}
                                    onChange={handleChange}
                                    placeholder="Descripción del diagnóstico"
                                    rows="5"
                                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full"
                                />
                            </div>

                            {/* Campos de Medicamento */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1 text-gray-700">Medicamentos</label>
                                <div className="space-y-2">
                                    {formData.recetas.map((receta, index) => (
                                        <RecetaInput
                                            key={index}
                                            receta={receta}
                                            index={index}
                                            onChange={handleRecetaChange}
                                            onRemove={removeReceta}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={addReceta}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Agregar Medicamento
                                </button>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSave}
                                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                            >
                                Guardar
                            </button>
                            <a
                                href="/historial"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
}
