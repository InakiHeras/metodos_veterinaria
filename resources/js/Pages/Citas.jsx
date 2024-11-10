import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Base from './Base';
import '../../css/Citas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';

export default function Citas() {
    const { citas, user } = usePage().props; // Recibe los datos del usuario
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

                {/* Botón fuera de la tabla */}
                <button className="agendar-cita-btn" onClick={openModal}>Agendar cita</button>

                {isModalOpen && (
                    <div className="modal-overlay citas-modal">
                        <div className="modal-content">
                            <h2 className="modal-title">Registro de cita</h2>
                            <form className="modal-form">
                                <div className="form-row full-width">
                                    <legend>Datos del dueño</legend>
                                </div>
                                <div className="form-row four-columns">
                                    <label>Nombre:</label>
                                    <input type="text" defaultValue={user.nombre} />
                                    <label>Apellidos:</label>
                                    <input type="text" defaultValue={user.apellidos} />
                                </div>
                                <div className="form-row four-columns">
                                    <label>Correo:</label>
                                    <input type="email" defaultValue={user.email} />
                                    <label>Teléfono:</label>
                                    <input type="tel" defaultValue={user.telefono} />
                                </div>
                                <div className="form-row single-column">
                                    <legend>Datos de la mascota</legend>
                                </div>
                                <div className="form-row two-columns">
                                    <label>Mascota:</label>
                                    <input type="text" name="mascota" />
                                    <label>Motivo:</label>
                                    <input type="text" name="motivo" />
                                </div>
                                <div className="form-row three-columns">
                                    <label>Especie:</label>
                                    <input type="text" name="especie" />
                                    <label>Raza:</label>
                                    <input type="text" name="raza" />
                                    <label>Fecha:</label>
                                    <input type="date" />
                                    <label>Hora:</label>
                                    <input type="time" />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="save-btn">Guardar</button>
                                    <button type="button" className="cancel-btn" onClick={closeModal}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Base>
    );
}
