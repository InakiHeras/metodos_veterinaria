import React, { useEffect, useState } from 'react';
import '../../css/inicio.css';
import axios from 'axios';

const Inicio = ({ citas: initialCitas }) => {
    const [time, setTime] = useState('');
    const [ampm, setAmpm] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10)); // Fecha actual en formato YYYY-MM-DD
    const [citas, setCitas] = useState(initialCitas);
    const [completedCitas, setCompletedCitas] = useState({}); // Estado para manejar citas completadas

    // Cargar el mensaje inicial desde localStorage o usar un mensaje predeterminado
    const [eventText, setEventText] = useState(
        localStorage.getItem('eventText') || "Ingresa tus eventos."
    );
    const [isEditing, setIsEditing] = useState(false);

    // Actualiza la hora cada minuto y separa AM/PM
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convierte a formato de 12 horas
            setTime(`${hours}:${minutes}`);
            setAmpm(ampm);
        };

        const interval = setInterval(updateClock, 1000);
        updateClock();

        return () => clearInterval(interval);
    }, []);

    // Cambia la fecha y obtiene las citas de esa fecha
    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setFecha(selectedDate);

        try {
            const response = await axios.get(`/citas?fecha=${selectedDate}`);
            setCitas(response.data); // Actualiza las citas con las de la fecha seleccionada
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    // Recupera el estado de los checkboxes al montar el componente
    useEffect(() => {
        const savedCompletedCitas = JSON.parse(localStorage.getItem('completedCitas')) || {};
        setCompletedCitas(savedCompletedCitas);
    }, []);

    // Maneja el cambio de estado del checkbox y lo guarda en localStorage
    const handleCheckboxChange = (id) => {
        setCompletedCitas((prev) => {
            const newCompletedCitas = { ...prev, [id]: !prev[id] };
            localStorage.setItem('completedCitas', JSON.stringify(newCompletedCitas));
            return newCompletedCitas;
        });
    };

    // Funciones para editar y guardar el texto de eventos
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
            <div className="container">
                <div className="header">Bienvenid@ Rosita ≽^• ˕ • ྀི≼</div>

                <div className="content">
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
                                        <tr key={cita.id_consulta} className={completedCitas[cita.id_consulta] ? "completed" : ""}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={!!completedCitas[cita.id_consulta]}
                                                    onChange={() => handleCheckboxChange(cita.id_consulta)}
                                                />
                                            </td>
                                            <td>{cita.hora}</td>
                                            <td>
                                                {cita.cliente && cita.cliente.usuario 
                                                    ? `${cita.cliente.usuario.nombre} ${cita.cliente.usuario.apellidos}`
                                                    : 'Cliente no disponible'}
                                            </td>
                                            <td>{cita.motivo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        
                    </div>

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
                                    maxLength={100} // Limitar a 10 caracteres
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
        
    );
};

export default Inicio;
