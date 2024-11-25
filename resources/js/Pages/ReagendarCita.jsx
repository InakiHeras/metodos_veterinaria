import '../../css/Citas.css';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ReagendarCita({ citaSeleccionada, duenos, veterinarios, onClose }) {
    const [citaData, setCitaData] = useState({
        id_usuario: '',
        id_mascota: '',
        motivo: '',
        fecha: '',
        hora: '',
        id_veterinario: '',
    });

    // Cargar datos iniciales de la cita seleccionada
    useEffect(() => {
        if (citaSeleccionada) {
            setCitaData({
                id_usuario: citaSeleccionada.mascota?.id_usuario || '',
                id_mascota: citaSeleccionada.mascota?.id_mascota || '',
                motivo: citaSeleccionada.motivo || '',
                fecha: citaSeleccionada.fecha || '',
                hora: citaSeleccionada.hora || '',
                id_veterinario: citaSeleccionada.id_veterinario || '',
            });
        }
    }, [citaSeleccionada]);

    // Obtener información del dueño
    const getDuenoDatos = (id_usuario) => {
        const dueno = duenos.find(d => d.id_usuario === id_usuario);
        return dueno || { nombre_completo: '', telefono: '', email: '' };
    };

    // Obtener nombre del veterinario
    const getVeterinarioNombre = (id_veterinario) => {
        const veterinario = veterinarios.find(v => v.id_usuario === id_veterinario);
        return veterinario?.nombre_completo || '';
    };

    // Manejar cambios en campos editables (fecha y hora)
    const handleChange = (e) => {
        setCitaData({
            ...citaData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Registrar las fechas originales y las nuevas
        console.log('Fecha original:', citaSeleccionada.fecha);
        console.log('Hora original:', citaSeleccionada.hora);
        console.log('Fecha nueva:', citaData.fecha);
        console.log('Hora nueva:', citaData.hora);
    
        // Actualizar la cita localmente antes de enviarla
        const updatedCita = { ...citaSeleccionada, fecha: citaData.fecha, hora: citaData.hora };
    
        // Enviar los datos al backend
        Inertia.post('/citas/reagendar', updatedCita);
    
        // Cerrar el modal
        onClose();
    };
    

    // Cancelar y cerrar modal
    const handleCancel = () => {
        if (onClose) onClose();
    };

    const duenoDatos = getDuenoDatos(citaData.id_usuario);

    return (
        <div className="modal-overlay citas-modal">
            <div className="modal-content">
                <h2 className="modal-title">Reagendar cita</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Datos del dueño</legend>
                        <div className="form-row three-columns">
                            <label>Dueño:</label>
                            <input type="text" value={duenoDatos.nombre_completo} disabled />
                            <label>Teléfono:</label>
                            <input type="tel" value={duenoDatos.telefono} disabled />
                            <label>Correo:</label>
                            <input type="email" value={duenoDatos.email} disabled />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Datos de la mascota</legend>
                        <div className="form-row two-columns">
                            <label>Mascota:</label>
                            <input type="text" value={citaSeleccionada?.mascota?.nombre || ''} disabled />
                            <label>Motivo:</label>
                            <input type="text" value={citaData.motivo} disabled />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Detalles de la cita</legend>
                        <div className="form-row three-columns">
                            <label>Fecha:</label>
                            <input
                                type="date"
                                name="fecha"
                                value={citaData.fecha}
                                onChange={handleChange}
                            />
                            <label>Hora:</label>
                            <input
                                type="time"
                                name="hora"
                                value={citaData.hora}
                                onChange={handleChange}
                            />
                            <label>Veterinario:</label>
                            <input
                                type="text"
                                value={getVeterinarioNombre(citaData.id_veterinario)}
                                disabled
                            />
                        </div>
                    </fieldset>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">Guardar</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}