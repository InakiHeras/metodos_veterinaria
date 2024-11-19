import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import AgregarCita from './AgregarCita';
import Base from './Base';
import '../../css/Citas.css';

export default function Citas() {
    const { citas, duenos, veterinarios } = usePage().props; // Asegúrate de que veterinarios estén disponibles
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                            {citas.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.motivo}</td>
                                    <td>
                                        <button className="action-btn reagendar-btn">
                                            <FontAwesomeIcon icon={faSyncAlt} />
                                        </button>
                                        <button className="action-btn cancelar-btn">
                                            <FontAwesomeIcon icon={faBan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>

                <button className="action-btn agendar-cita-btn" onClick={openModal}>Agendar cita</button>

                {isModalOpen && (
                    <AgregarCita
                        duenos={duenos}
                        veterinarios={veterinarios} // Asegúrate de pasar veterinarios
                        mascotas={duenos.filter(dueno => dueno.mascotas).flatMap(dueno => dueno.mascotas)}
                        onClose={closeModal}  // Cambiado a "onClose"
                    />
                )}
            </div>
        </Base>
    );
}
