import React, { useState } from "react";
import jsPDF from "jspdf";
import Base from "./Base";
import "../../css/inicio.css"; // Importar estilos generales

export default function Historial({ historial }) {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda
    // Filtrar el historial según el término de búsqueda
    const filteredHistorial = historial.filter((item) => {
        const searchIn = `${item.fecha} ${item.diagnostico} ${item.razon} ${item.veterinario} ${item.cliente} ${item.mascota}`;
        return searchIn.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Función para generar y descargar un PDF con los datos de la fila
    const generatePDF = (item) => {
        const doc = new jsPDF();

        // Configurar contenido del PDF
        doc.setFontSize(12);
        doc.text("Historial de Cita", 10, 10);
        doc.text(`Fecha: ${item.fecha}`, 10, 20);
        doc.text(`Médico: ${item.veterinario}`, 10, 30);
        doc.text(`Cliente: ${item.cliente}`, 10, 40);
        doc.text(`Mascota: ${item.mascota}`, 10, 50);
        doc.text(`Razón: ${item.razon}`, 10, 60);
        doc.text(`Diagnóstico: ${item.diagnostico}`, 10, 70);

        doc.text("Recetas:", 10, 80);
        item.recetas.forEach((receta, index) => {
            doc.text(`- ${receta.nombre_medicamento}`, 10, 90 + index * 10);
        });

        // Descargar el archivo PDF
        doc.save(`Historial_${item.cliente}_${item.fecha}.pdf`);
    };

    return (
        <Base>
            <div className="container">
                <div className="p-6 min-h-screen">
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
                                    <th className="p-2 border border-gray-300 text-center">ID</th>
                                    <th className="p-2 border border-gray-300 text-center" style={{ width: "15%" }}>
                                        Fecha de cita
                                    </th>
                                    <th className="p-2 border border-gray-300 text-center">Receta</th>
                                    <th className="p-2 border border-gray-300 text-center">Diagnóstico</th>
                                    <th className="p-2 border border-gray-300 text-center">Razón</th>
                                    <th className="p-2 border border-gray-300 text-center">Médico</th>
                                    <th className="p-2 border border-gray-300 text-center">Cliente / Mascota</th>
                                    <th className="p-2 border border-gray-300 text-center">Historial PDF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistorial.length > 0 ? (
                                    filteredHistorial.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-pink-50">
                                            <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                            <td className="p-2 border border-gray-300 text-center" style={{ width: "15%" }}>
                                                {item.fecha}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                <ul className="list-disc ml-4">
                                                    {item.recetas.map((receta, recetaIndex) => (
                                                        <li key={recetaIndex}>
                                                            <span className="font-bold">{receta.nombre_medicamento}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">{item.diagnostico}</td>
                                            <td className="p-2 border border-gray-300 text-center">{item.razon}</td>
                                            <td className="p-2 border border-gray-300 text-center">{item.veterinario}</td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                {item.cliente}: {item.mascota}
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                {/* Imagen para descargar PDF */}
                                                <img
                                                    src="/assets/descarga.svg"
                                                    alt="Descargar PDF"
                                                    className="w-6 h-6 mx-auto cursor-pointer hover:opacity-80"
                                                    onClick={() => generatePDF(item)}
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
                        <a
                            href="/historial_form"
                            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-all"
                        >
                            Agregar
                        </a>
                    </div>
                </div>
            </div>
        </Base>
    );
}
