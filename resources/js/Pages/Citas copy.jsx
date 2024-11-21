import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia';
import Base from './Base';
import '../../css/Citas.css';

export default function Citas() {
    const {citas, duenos, veterinarios } = usePage().props; 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDuenos, setFilteredDuenos] = useState([]);
    const [searchTermVeterinario, setSearchTermVeterinario] = useState(""); 
    const [filteredVeterinarios, setFilteredVeterinarios] = useState([]);
    const [mascota, setMascota] = useState([]);
    const [isMascotaOpen, setIsMascotaOpen] = useState(false);
    const [citaData, setCitaData] = useState({
        duenoId: '',
        mascotaId: '',
        motivo: '',
        fecha: '',
        hora: '',
        id_veterinario: '',
        telefono: '',
        email: ''
    });
    const [citasList, setCitasList] = useState(citas); // Estado para las citas

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Filtrado de dueños
    useEffect(() => {
        if (searchTerm) {
            setFilteredDuenos(
                duenos.filter(dueno =>
                    dueno.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredDuenos([]);
        }
    }, [searchTerm, duenos]);

    // Filtrado de veterinarios
    useEffect(() => {
        if (searchTermVeterinario) {
            const veterinariosFiltrados = veterinarios.filter(veterinario =>
                veterinario.nombre_completo.toLowerCase().includes(searchTermVeterinario.toLowerCase())
            );
            setFilteredVeterinarios(veterinariosFiltrados);
        } else {
            setFilteredVeterinarios([]);
        }
    }, [searchTermVeterinario, veterinarios]);

    const handleChange = (e) => {
        setCitaData({
            ...citaData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectDueno = (dueno) => {
        setCitaData({
            ...citaData,
            duenoId: dueno.id_usuario,
            telefono: dueno.telefono || '',
            email: dueno.email || ''
        });
        setSearchTerm(dueno.nombre_completo);
        setFilteredDuenos([]);
        setMascota(dueno.mascota || []);
    };

    const handleSelectMascota = (mascota) => {
        setCitaData({
            ...citaData,
            mascotaId: mascota.id_mascota || ""
        });
        setIsMascotaOpen(false);
    };

    const handleSelectVeterinario = (veterinario) => {
        setCitaData({
            ...citaData,
            id_veterinario: veterinario.id_usuario,
        });
        setSearchTermVeterinario(veterinario.nombre_completo);  
        setFilteredVeterinarios([]);  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/citas', citaData, {
            onSuccess: (response) => {
                // Actualiza las citas con los nuevos datos
                setCitasList(response.props.citas);  // Asegúrate de que response.contenga las citas actualizadas
                closeModal();  // Cierra el modal luego de guardar la cita
            },
            onError: (error) => {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error al agregar la cita');
            }
        });
    };
    
    const handleCancel = () => {
        if (onClose) onClose();
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

                <button className="action-btn agendar-cita-btn" onClick={openModal}>Agendar cita</button>

                {isModalOpen && (
                    <div className="modal-overlay citas-modal">
                        <div className="modal-content">
                            <h2 className="modal-title">Registro de cita</h2>
                            <form className="modal-form" onSubmit={handleSubmit}>
                                <div className="form-row full-width">
                                    <legend>Datos del dueño</legend>
                                </div>

                                <div className="form-row three-columns">
                                    <label>Dueño:</label>
                                    <div className="autocomplete">
                                        <input
                                            type="text"
                                            name="searchTerm"
                                            placeholder="Escribe el nombre del dueño"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} 
                                        />
                                        {searchTerm && filteredDuenos.length > 0 && (
                                            <ul className="autocomplete-results">
                                                {filteredDuenos.map((dueno) => (
                                                    <li
                                                        key={dueno.id_usuario}
                                                        onClick={() => handleSelectDueno(dueno)}
                                                    >
                                                        {dueno.nombre_completo}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <label>Teléfono:</label>
                                    <input 
                                        type="tel" 
                                        name="telefono" 
                                        value={citaData.telefono || ''} 
                                        onChange={handleChange} 
                                    />
                                    <label>Correo:</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={citaData.email || ''} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="form-row single-column">
                                    <legend>Datos de la mascota</legend>
                                </div>

                                <div className="form-row two-columns">
                                    <label>Mascota:</label>
                                    <div className="autocomplete-mascota">
                                        <input
                                            type="text"
                                            name="searchTermMascota"
                                            placeholder="Escribe el nombre de la mascota"
                                            value={citaData.mascotaId ? mascota.find(mascota => mascota.id_mascota === citaData.mascotaId)?.nombre : ""}
                                            onChange={() => setIsMascotaOpen(true)}
                                        />
                                        {isMascotaOpen && mascota.length > 0 && (
                                            <ul className="autocomplete-results">
                                                {mascota.map((mascota) => (
                                                    <li
                                                        key={mascota.id_mascota}
                                                        onClick={() => handleSelectMascota(mascota)}
                                                    >
                                                        {mascota.nombre}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <label>Motivo:</label>
                                    <input type="text" name="motivo" value={citaData.motivo} onChange={handleChange} />
                                </div>

                                <div className="form-row three-columns">
                                    <label>Fecha:</label>
                                    <input type="date" name="fecha" value={citaData.fecha} onChange={handleChange} />
                                    <label>Hora:</label>
                                    <input type="time" name="hora" value={citaData.hora} onChange={handleChange} />
                                    <div className="form-row three-columns">
                                    <label>Veterinario:</label>
                                        <div className="autocomplete-veterinario">
                                            <input
                                                type="text"
                                                name="veterinario"
                                                placeholder="Nombre del veterinario"
                                                value={searchTermVeterinario} 
                                                onChange={(e) => setSearchTermVeterinario(e.target.value)}  
                                            />
                                            
                                            {searchTermVeterinario && filteredVeterinarios.length > 0 && (
                                                <ul className="autocomplete-results">
                                                    {filteredVeterinarios.map((veterinario) => (
                                                        <li
                                                            key={veterinario.id_usuario}
                                                            onClick={() => handleSelectVeterinario(veterinario)}  
                                                        >
                                                            {veterinario.nombre_completo}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            
                                            <input 
                                                type="hidden" 
                                                name="id_veterinario"  
                                                value={citaData.id_veterinario}  
                                            />
                                        </div>
                                    </div>
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
