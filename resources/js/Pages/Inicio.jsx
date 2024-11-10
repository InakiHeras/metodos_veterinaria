import React, { useEffect, useState } from 'react';
import Base from './Base'; // Importa el componente Base para envolver el contenido
import '../../css/inicio.css';
import axios from 'axios';

const Inicio = ({ citas: initialCitas }) => {
    const [time, setTime] = useState('');
    const [ampm, setAmpm] = useState('');
    
    // Usar la fecha local correctamente ajustada a la zona horaria local
    const getLocalDate = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 10);
    };

    const [fecha, setFecha] = useState(getLocalDate());
    const [citas, setCitas] = useState(initialCitas);
    const [completedCitas, setCompletedCitas] = useState({});

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
        setFecha(selectedDate); // Actualiza el estado de la fecha inmediatamente
    
        try {
            const response = await axios.get(`/citas_fecha?fecha=${selectedDate}`);
            setCitas(response.data); // Actualiza las citas con las de la fecha seleccionada
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

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
    }, [fecha]); // Ejecuta este efecto cada vez que `fecha` cambia
    

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
        <Base>
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
