import React, { useState } from 'react';
import '../../css/Citas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';

export default function Citas() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="citas-page">
            <header className="navbar">
                <img src="/assets/logo.png" alt="Logo" className="logo" />
                <nav className="nav-links">
                    <ul>
                        <li><a href="/" className="nav-link">Inicio</a></li>
                        <li><a href="/citas" className="nav-link active">Citas</a></li>
                        <li><a href="/historial" className="nav-link">Historial</a></li>
                        <li><a href="/agregar-mascotas" className="nav-link">Agregar mascotas</a></li>
                        <li><a href="/cerrar-sesion" className="nav-link">Cerrar sesión</a></li>
                    </ul>
                </nav>
                <div className="user-icon">👤</div>
            </header>

            <main className="table-container">
                <table className="citas-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Reagendar/Cancelar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0104SA</td>
                            <td>28/octubre/2024</td>
                            <td>2:00 pm</td>
                            <td>Vacuna</td>
                            <td>
                                <button className="action-btn reagendar-btn">
                                    <FontAwesomeIcon icon={faSyncAlt} />
                                </button>
                                <button className="action-btn cancelar-btn">
                                    <FontAwesomeIcon icon={faBan} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>0105RE</td>
                            <td>05/noviembre/2024</td>
                            <td>5:00 pm</td>
                            <td>Castración</td>
                            <td>
                                <button className="action-btn reagendar-btn">
                                    <FontAwesomeIcon icon={faSyncAlt} />
                                </button>
                                <button className="action-btn cancelar-btn">
                                    <FontAwesomeIcon icon={faBan} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="agendar-cita-btn" onClick={openModal}>Agendar cita</button>
            </main>

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
                                <input type="text" />
                                <label>Apellidos:</label>
                                <input type="text" />
                            </div>
                            <div className="form-row four-columns">
                                <label>Correo:</label>
                                <input type="email" />
                                <label>Teléfono:</label>
                                <input type="tel" />
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
                                <label>Tipo/raza:</label>
                                <input type="text" />
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
    );
}
