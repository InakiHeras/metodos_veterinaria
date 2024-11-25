import React, { useState } from "react";
import Base from "./Base";
import "../../css/historial.css";

// Componente hijo para entradas de recetas
const RecetaInput = ({ receta, index, onChange, onRemove }) => (
    <div className="flex items-center gap-2 mb-2">
        <input
            type="text"
            value={receta.nombre_medicamento}
            onChange={(e) => onChange(index, "nombre_medicamento", e.target.value)}
            placeholder="Medicamento"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/3"
            style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: "#f2cbe3",
                boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                color: "#333",
                minWidth: "150px",  // Ajusta el tamaño mínimo
                maxWidth: "100%",   // Asegura que se adapte al contenedor
                height: "40px",     // Limita la altura
                overflowY: "auto",  // Permite desplazamiento vertical
                resize: "none",     // Desactiva el redimensionamiento
            }}
        />
        <input
            type="text"
            value={receta.dosis}
            onChange={(e) => onChange(index, "dosis", e.target.value)}
            placeholder="Dosis"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/4"
            style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: "#f2cbe3",
                boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                color: "#333",
                minWidth: "100px",
                maxWidth: "100%",
                height: "40px",    // Limita la altura
                overflowY: "auto", // Permite desplazamiento vertical
                resize: "none",    // Desactiva el redimensionamiento
            }}
        />
        <input
            type="text"
            value={receta.tiempo}
            onChange={(e) => onChange(index, "tiempo", e.target.value)}
            placeholder="Tiempo"
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/4"
            style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: "#f2cbe3",
                boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                color: "#333",
                minWidth: "100px",
                maxWidth: "100%",
                height: "40px",    // Limita la altura
                overflowY: "auto", // Permite desplazamiento vertical
                resize: "none",    // Desactiva el redimensionamiento
            }}
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


    console.log(citas);
    console.log(userRole);
    

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
                className="justify-center min-h-screen"
                style={{
                    padding: "10px",
                }}
            >
                <div
                    className="bg-pink-50" // Centrado y ajuste de tamaño
                    style={{
                        width: "70vw",
                        maxWidth: "1200px",
                        minHeight: "85vh",
                        backgroundColor: "#feecfa",  // Un color de fondo sólido
                        overflowY: "auto", 
                        position: "relative",
                        margin: "0 auto", // El margen aquí centra el formulario horizontalmente
                        marginTop: "0",   // Elimina el margen superior
                        paddingTop: "0",  // Si hay padding superior, puedes eliminarlo también
                    }}
                >
                    <div
                        className="text-center text-white font-bold text-3xl py-4"
                        style={{
                            backgroundColor: "#D970B1",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                        }}
                    >
                        Receta
                    </div>

                    <div className="p-8">

                        {/* Fila Médico */}
                        <div className="flex items-center mb-6">
                            <label htmlFor="medico" className="font-semibold mb-1 text-gray-700 mr-4">
                                Dr.
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
                                style={{
                                    width: "40%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "20px",
                                    backgroundColor: "#f2cbe3",
                                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    fontSize: "14px",
                                    color: "#333",
                                }}
                            />
                        </div>

                        {/* Fila ID, Fecha y Mascota */}
                        <div className="flex items-center mb-6 space-x-4">
                            {/* ID Cita */}
                            <div className="flex items-center mb-6 w-1/3">
                                <label htmlFor="id" className="font-semibold mb-1 text-gray-700 mr-4">ID Cita</label>
                                <select
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={(e) => handleSelectIdCita(e.target.value)}
                                className="border rounded px-1 py-1 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                                style={{
                                    width: "50%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "20px",
                                    backgroundColor: "#f2cbe3",
                                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    fontSize: "14px",
                                    color: "#333",
                                }}
                                >
                                <option value="">Seleccionar un ID</option>
                                {citas.map((cita) => (
                                    <option key={cita.id_cita} value={cita.id_cita}>
                                    {`ID: ${cita.id_cita} - ${cita.fecha} (${cita.motivo})`}
                                    </option>
                                ))}
                                </select>
                            </div>

                            {/* Fecha */}
                            <div className="flex items-center mb-6 w-1/3">
                                <label htmlFor="fecha" className="font-semibold mb-1 text-gray-700 mr-4">Fecha</label>
                                <input
                                id="fecha"
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="border rounded px-1 py-1 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                                readOnly
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "20px",
                                    backgroundColor: "#f2cbe3",
                                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    fontSize: "14px",
                                    color: "#333",
                                }}
                                />
                            </div>

                            {/* Mascota */}
                            <div className="flex items-center mb-6 w-1/3">
                                <label htmlFor="mascota" className="font-semibold mb-1 text-gray-700 mr-4">Mascota</label>
                                <input
                                id="mascota"
                                type="text"
                                name="mascota"
                                value={formData.mascota}
                                onChange={handleChange}
                                placeholder="Nombre de la mascota"
                                className="border rounded px-1 py-1 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                                readOnly
                                style={{
                                    width: "50%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "20px",
                                    backgroundColor: "#f2cbe3",
                                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    fontSize: "14px",
                                    color: "#333",
                                }}
                                />
                            </div>
                        </div>


                        {/* Diagnostico y medicamentos */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* Diagnóstico */}
                            <div className="flex flex-col">
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
                                    style={{
                                        width: "80%",  // Reduce el ancho de diagnóstico
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        borderRadius: "20px",
                                        backgroundColor: "#f2cbe3",
                                        boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        fontSize: "14px",
                                        color: "#333",
                                        height: "150px",  // Altura definida
                                        resize: "none"  // Desactivar redimensionamiento
                                    }}
                                />
                            </div>

                            {/* Medicamentos */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1 text-gray-700">Medicamentos</label>
                                <div className="space-y-2">
                                    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                                        {formData.recetas.map((receta, index) => (
                                            <RecetaInput
                                                key={index}
                                                receta={receta}
                                                index={index}
                                                onChange={handleRecetaChange}
                                                onRemove={removeReceta}
                                                className="scroll-input"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Agregar receta */}
                                <div className="text-center mt-4">
                                    <button
                                        onClick={addReceta}
                                        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                                    >
                                        Agregar
                                    </button>
                                </div>
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

                    {/* Texto abajo de los botones */}
                    <div className="text-center mt-4">
                        <img
                            src="/assets/firma.png" // Ruta de la imagen
                            alt="Footer"
                            className="mx-auto"
                            style={{
                                maxWidth: "20%",
                                height: "auto", // Mantiene la proporción de la imagen
                                marginBottom: "10px", // Espacio entre la imagen y el texto
                            }}
                        />
                        <p className="text-gray-700">
                            Domicilio: Av. Comalcalco 62, 77515 Cancún, Q.R.
                        </p>
                    </div>
                </div>
            </div>
        </Base>
    );
}
