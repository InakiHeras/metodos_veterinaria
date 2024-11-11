import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Base from './Base';
import '../../css/Citas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';

export default function Citas() {
    const { citas, user, dueno } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        telefono: user.telefono,
        mascota: '',
        motivo: '',
        especie: '',
        raza: '',
        fecha: '',
        hora: '',
    });

    useEffect(() => {
        // Imprimir los datos del usuario y del dueño en la consola
        console.log("ID Usuario:", user.id_usuario);
        console.log("Nombre:", user.nombre);
        console.log("ID Cliente:", dueno ? dueno.id_cliente : "No encontrado");
    }, [user, dueno]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/citas', formData, {
            onSuccess: () => {
                closeModal();
                setFormData({
                    nombre: user.nombre,
                    apellidos: user.apellidos,
                    email: user.email,
                    telefono: user.telefono,
                    mascota: '',
                    motivo: '',
                    especie: '',
                    raza: '',
                    fecha: '',
                    hora: '',
                });
            },
        });
    };

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

                <button className="agendar-cita-btn" onClick={openModal}>Agendar cita</button>

                {isModalOpen && (
                    <div className="modal-overlay citas-modal">
                        <div className="modal-content">
                            <h2 className="modal-title">Registro de cita</h2>
                            <form className="modal-form" onSubmit={handleSubmit}>
                                <div className="form-row full-width">
                                    <legend>Datos del dueño</legend>
                                </div>
                                <div className="form-row four-columns">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                                    <label>Apellidos:</label>
                                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                                </div>
                                <div className="form-row four-columns">
                                    <label>Correo:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    <label>Teléfono:</label>
                                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                                </div>
                                <div className="form-row single-column">
                                    <legend>Datos de la mascota</legend>
                                </div>
                                <div className="form-row two-columns">
                                    <label>Mascota:</label>
                                    <input type="text" name="mascota" value={formData.mascota} onChange={handleChange} />
                                    <label>Motivo:</label>
                                    <input type="text" name="motivo" value={formData.motivo} onChange={handleChange} />
                                </div>
                                <div className="form-row three-columns">
                                    <label>Especie:</label>
                                    <input type="text" name="especie" value={formData.especie} onChange={handleChange} />
                                    <label>Raza:</label>
                                    <input type="text" name="raza" value={formData.raza} onChange={handleChange} />
                                    <label>Fecha:</label>
                                    <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                                    <label>Hora:</label>
                                    <input type="time" name="hora" value={formData.hora} onChange={handleChange} />
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
