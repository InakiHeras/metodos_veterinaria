import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Base from './Base';
import '../../css/Citas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBan } from '@fortawesome/free-solid-svg-icons';

export default function Citas() {
    const { citas, user, duenos } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
    const [filteredDuenos, setFilteredDuenos] = useState([]); // Estado para los dueños filtrados
    const [formData, setFormData] = useState({
        duenoId: '', 
        mascota: '',
        motivo: '',
        especie: '',
        raza: '',
        fecha: '',
        hora: '',
        telefono: '', // Agregado para almacenar el teléfono
        email: '' // Agregado para almacenar el email
    });

    useEffect(() => {
        // Filtrar dueños basados en el término de búsqueda
        if (searchTerm) {
            setFilteredDuenos(
                duenos.filter(dueno =>
                    dueno.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredDuenos([]); // Vaciamos la lista cuando no hay búsqueda
        }
    }, [searchTerm, duenos]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectDueno = (dueno) => {
        console.log("Dueño seleccionado:", dueno);  // Muestra todo el objeto 'dueno' en la consola
        console.log("Email del dueño:", dueno.email);  // Verifica el correo
        console.log("Teléfono del dueño:", dueno.telefono);  // Verifica el teléfono
    
        // Actualizar los campos del formulario con los datos del dueño
        setFormData({
            ...formData,
            duenoId: dueno.id_cliente,  // ID del cliente (dueño)
            telefono: dueno.telefono || '',  // Asignamos el teléfono
            email: dueno.email || '',  // Asignamos el correo
        });
    
        // Actualiza el campo de búsqueda con el nombre del dueño
        setSearchTerm(dueno.nombre_completo);
    
        // Ocultar la lista de resultados
        setFilteredDuenos([]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/citas', formData, {
            onSuccess: () => {
                closeModal();
                setFormData({
                    duenoId: '',
                    mascota: '',
                    motivo: '',
                    especie: '',
                    raza: '',
                    fecha: '',
                    hora: '',
                    telefono: '',
                    email: ''
                });
                setSearchTerm("");
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

                <button className="action-btn agendar-cita-btn" onClick={openModal}>Agendar cita</button>

                {isModalOpen && (
                    <div className="modal-overlay citas-modal">
                        <div className="modal-content">
                            <h2 className="modal-title">Registro de cita</h2>
                            <form className="modal-form" onSubmit={handleSubmit}>
                                <div className="form-row full-width">
                                    <legend>Datos del dueño</legend>
                                </div>

                                {/* Campo de búsqueda para dueños */}
                                <div className="form-row three-columns"> {/* Cambié a three-columns */}
                                    <label>Dueño:</label>
                                    <div className="autocomplete">
                                        <input
                                            type="text"
                                            name="searchTerm"
                                            placeholder="Escribe el nombre del dueño"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} 
                                        />
                                        {/* Mostrar lista filtrada de dueños */}
                                        {searchTerm && filteredDuenos.length > 0 && (
                                            <ul className="autocomplete-results">
                                                {filteredDuenos.map((dueno) => (
                                                    <li
                                                        key={dueno.id_cliente}
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
                                        value={formData.telefono} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                {/* Fila para correo, solo dos columnas */}
                                <div className="form-row two-columns">
                                    <label>Correo:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
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
