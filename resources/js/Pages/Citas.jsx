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
        mascotaId: '', // Ahora almacenamos el ID de la mascota
        motivo: '',
        fecha: '',
        hora: '',
        veterinario: '',
        telefono: '',
        email: ''
    });

    const [mascotas, setMascotas] = useState([]); // Estado para las mascotas del dueño seleccionado
    const [isMascotaOpen, setIsMascotaOpen] = useState(false); // Estado para controlar si el menú de mascotas está abierto

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
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            duenoId: '',
            mascotaId: '', // Restablecemos mascota
            motivo: '',
            fecha: '',
            hora: '',
            veterinario: '',
            telefono: '',
            email: ''
        });
        setSearchTerm(""); // Limpiar el término de búsqueda
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectDueno = (dueno) => {
        setFormData({
            ...formData,
            duenoId: dueno.id_usuario,
            telefono: dueno.telefono || '',
            email: dueno.email || ''
        });
        setSearchTerm(dueno.nombre_completo);
        setFilteredDuenos([]); // Limpiar los resultados filtrados al seleccionar un dueño

        // Verificar si el dueño tiene mascotas asociadas
        if (dueno.mascotas && dueno.mascotas.length > 0) {
            setMascotas(dueno.mascotas); // Cargar las mascotas asociadas
        } else {
            setMascotas([]); // Si no tiene mascotas, limpiar el estado de mascotas
        }

        console.log("Dueño seleccionado:", dueno.nombre_completo);
        console.log("ID del dueño:", dueno.id_usuario);
        console.log("Mascotas del dueño:", dueno.mascotas);

        // Cerrar el menú de dueños después de seleccionar uno
        setFilteredDuenos([]);
    };

    const handleSelectMascota = (mascota) => {
        setFormData({
            ...formData,
            mascotaId: mascota.id_mascota
        });
        setIsMascotaOpen(false); // Cerramos el menú de mascotas después de seleccionar
        console.log("Mascota seleccionada:", mascota.nombre);
        console.log("ID de la mascota seleccionada:", mascota.id_mascota);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/citas', formData, {
            onSuccess: () => {
                closeModal(); // Al enviar, también cerramos el modal y limpiamos los campos
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
                                        value={formData.telefono} 
                                        onChange={handleChange} 
                                    />
                                    <label>Correo:</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
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
                                            value={formData.mascotaId ? mascotas.find(mascota => mascota.id_mascota === formData.mascotaId)?.nombre : ""}
                                            onChange={(e) => {
                                                setFormData({ ...formData, mascotaId: e.target.value });
                                                setIsMascotaOpen(true); // Abrimos el menú de opciones de mascotas
                                            }}
                                        />
                                        {isMascotaOpen && formData.mascotaId && mascotas.length > 0 && (
                                            <ul className="autocomplete-results">
                                                {mascotas.map((mascota) => (
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
                                    <input type="text" name="motivo" value={formData.motivo} onChange={handleChange} />
                                </div>

                                <div className="form-row three-columns">
                                    <label>Fecha:</label>
                                    <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                                    <label>Hora:</label>
                                    <input type="time" name="hora" value={formData.hora} onChange={handleChange} />
                                    <label>Veterinario:</label>
                                    <input type="text" name="veterinario" value={formData.veterinario} onChange={handleChange} />
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
