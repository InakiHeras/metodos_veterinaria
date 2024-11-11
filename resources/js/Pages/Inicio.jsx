import React, { useEffect, useState } from 'react';
import Base from './Base';
import '../../css/inicio.css';
import axios from 'axios';

const Inicio = ({ citas: initialCitas, userName, userRole }) => {
    const [time, setTime] = useState('');
    const [ampm, setAmpm] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [citas, setCitas] = useState(initialCitas);
    const [completedCitas, setCompletedCitas] = useState({});
    const [eventText, setEventText] = useState(localStorage.getItem('eventText') || "Ingresa tus eventos.");
    const [isEditing, setIsEditing] = useState(false);

    // Actualizar reloj cada minuto
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            setTime(`${hours}:${minutes}`);
            setAmpm(ampm);
        };
        const interval = setInterval(updateClock, 1000);
        updateClock();
        return () => clearInterval(interval);
    }, []);

    // Manejar el cambio de fecha y cargar citas
    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setFecha(selectedDate);
        try {
            const response = await axios.get(`/citas_fecha?fecha=${selectedDate}`);
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    // Cargar citas al inicio si la fecha cambia
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get(`/citas_fecha?fecha=${fecha}`);
                setCitas(response.data);
            } catch (error) {
                console.error('Error al obtener citas:', error);
            }
        };
        fetchCitas();
    }, [fecha]);

    // Manejo del checkbox para citas completadas
    const handleCheckboxChange = (id) => {
        setCompletedCitas((prev) => {
            const newCompletedCitas = { ...prev, [id]: !prev[id] };
            localStorage.setItem('completedCitas', JSON.stringify(newCompletedCitas));
            return newCompletedCitas;
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEventTextChange = (e) => {
        setEventText(e.target.value);
    };

    const saveEventText = () => {
        localStorage.setItem('eventText', eventText);
    };

    const handleBlur = () => {
        setIsEditing(false);
        saveEventText();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <Base>
            <div className="container">
                <div className="header">Bienvenid@ {userName} ≽^• ˕ • ྀི≼</div>
                <div className="content">
                    {/* Mostrar la sección de citas solo si el rol es 'veterinario' */}
                    {userRole === 'veterinario' && (
                        <div className="left-section">
                            <div className="subheader">Citas de hoy</div>

                            <div className="date-filter">
                                <label>Fecha:</label>
                                <input
                                    type="date"
                                    value={fecha}
                                    onChange={handleDateChange}
                                />
                            </div>

                            <div className="table-container" key={fecha}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th>Hora</th>
                                            <th>Cliente</th>
                                            <th>Razón</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {citas.map((cita) => (
                                            <tr key={cita.id_cita} className={completedCitas[cita.id_cita] ? "completed" : ""}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!completedCitas[cita.id_cita]}
                                                        onChange={() => handleCheckboxChange(cita.id_cita)}
                                                    />
                                                </td>
                                                <td>{cita.hora}</td>
                                                <td>
                                                    {cita.mascota && cita.mascota.dueño 
                                                        ? `${cita.mascota.dueño.nombre} ${cita.mascota.dueño.apellidos}`
                                                        : 'Cliente no disponible'}
                                                </td>
                                                <td>{cita.motivo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div className="right-section">
                        <div className="time-container">
                            <div className="time-inner">
                                <span className="time-text">{time}</span>
                                <span className="ampm-text">{ampm}</span>
                            </div>
                        </div>
                        <div className="events">
                            <h3>Próximos eventos</h3>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={eventText}
                                    onChange={handleEventTextChange}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    maxLength={100}
                                    autoFocus
                                />
                            ) : (
                                <p>{eventText}</p>
                            )}
                            <button className="edit-button" onClick={handleEditClick}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Inicio;
