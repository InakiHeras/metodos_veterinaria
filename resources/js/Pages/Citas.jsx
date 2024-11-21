import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import AgregarCita from './AgregarCita';
import Base from './Base';
import '../../css/Citas.css';

export default function Citas() {
    const { citas, duenos, veterinarios, user } = usePage().props; // Asegúrate de que user esté disponible
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const filteredCitas = user.tipo_usuario === 'dueño'
    ? citas.filter(cita => {
        // Verificar que cada cita tiene la propiedad mascota
        console.log('Cita:', cita);
        console.log('ID Usuario:', user.id_usuario);
        console.log('Mascota ID Usuario:', cita.mascota?.id_usuario); // Asegúrate de que "mascota" existe
        return cita.mascota && cita.mascota.id_usuario === user.id_usuario;
    })
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

                {isModalOpen &&(
                <AgregarCita
                    duenos={duenos}
                    veterinarios={veterinarios} 
                    mascota={duenos.filter(dueno => dueno.mascotas).flatMap(dueno => dueno.mascotas)}
                    user={user}  // Pasar el objeto 'user' completo si es dueño
                    onClose={closeModal}
                />
            )}

            </div>
        </Base>
    );
}
