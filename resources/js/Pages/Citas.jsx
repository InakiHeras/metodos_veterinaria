import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';  // Asegúrate de importar useForm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import AgregarCita from './AgregarCita'; // Componente para agregar una cita
import ReagendarCita from './ReagendarCita'; // Componente para reagendar una cita
import Base from './Base';
import '../../css/Citas.css';

export default function Citas() {
    const { citas, duenos, veterinarios, user } = usePage().props; // Asegúrate de que user esté disponible
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null); // Estado para la cita seleccionada
    const [isReagendar, setIsReagendar] = useState(false); // Estado para saber si se va a reagendar o agregar una cita

    // UseForm de Inertia.js para eliminar la cita
    const { delete: deleteCita } = useForm();  // Usa el hook delete de Inertia.js

    const openModal = (cita = null, reagendar = false) => {
        let dueno = null;

        if (cita && cita.mascota) {
            // Busca al dueño de la mascota en la lista de dueños
            dueno = duenos.find(d => d.id_usuario === cita.mascota.id_usuario);
            console.log("ID del dueño de la mascota:", dueno ? dueno.id_usuario : "No encontrado");
            console.log("Dueño de la mascota:", dueno ? dueno.nombre_completo : "No encontrado");
        } else {
            console.warn("La cita no tiene una mascota asociada.");
        }

        // Establece la cita seleccionada junto con el dueño
        setSelectedCita({
            ...cita,
            dueno, // Agregar los datos del dueño
        });

        setIsReagendar(reagendar); // Establecer si es para reagendar
        console.log("Cita seleccionada:", cita?.id_cita); // Log para ver el ID de la cita seleccionada
        setIsModalOpen(true); // Abrir el modal
    };

    // Función para cerrar el modal y limpiar la cita seleccionada
    const closeModal = () => {
        setSelectedCita(null); // Limpiar la cita seleccionada
        setIsReagendar(false); // Restablecer el estado de reagendar
        setIsModalOpen(false); // Cerrar el modal
    };

    // Función para eliminar la cita
    const eliminarCita = (idCita) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
            deleteCita(route('citas.destroy', idCita), {
                onSuccess: () => {
                    alert("Cita eliminada exitosamente.");
                    // Aquí podrías hacer alguna actualización para reflejar los cambios en la UI, si es necesario.
                },
                onError: () => {
                    alert("Hubo un error al eliminar la cita.");
                }
            });
        }
    };

    // Filtrar las citas basadas en el tipo de usuario
    const filteredCitas = user.tipo_usuario === 'dueño'
        ? citas.filter(cita => cita.mascota && cita.mascota.id_usuario === user.id_usuario)
        : citas;

    return (
        <Base>
            <div className="citas-page">
                <main className="citas-table-container">
                    <table className="citas-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Reagendar/Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCitas.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.motivo}</td>
                                    <td>
                                        <button 
                                            className="action-btn reagendar-btn"
                                            onClick={() => openModal(cita, true)} // Pasar la cita seleccionada para reagendar
                                        >
                                            <FontAwesomeIcon icon={faSyncAlt} />
                                        </button>
                                        <button 
                                            className="action-btn cancelar-btn"
                                            onClick={() => eliminarCita(cita.id_cita)} // Llamar a la función de eliminar
                                        >
                                            <FontAwesomeIcon icon={faBan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>

                <button className="action-btn agendar-cita-btn" onClick={() => openModal()}>Agendar cita</button>

                {/* Mostrar el modal solo cuando se haya seleccionado una cita */}
                {isModalOpen && (
                    isReagendar ? (
                        <ReagendarCita
                            duenos={duenos.filter(dueno => dueno.id_usuario === selectedCita?.mascota?.id_usuario)}
                            veterinarios={veterinarios}
                            mascota={[selectedCita?.mascota]} // Solo pasa la mascota relacionada con la cita seleccionada
                            user={user}
                            citaSeleccionada={selectedCita}
                            onClose={closeModal}
                        />
                    ) : (
                        <AgregarCita
                            duenos={duenos}
                            veterinarios={veterinarios}
                            mascota={duenos.filter(dueno => dueno.mascotas).flatMap(dueno => dueno.mascotas)}
                            user={user}  
                            onClose={closeModal}
                        />
                    )
                )}
            </div>
        </Base>
    );
}

