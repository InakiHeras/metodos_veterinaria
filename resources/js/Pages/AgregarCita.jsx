import '../../css/Citas.css';

import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function AgregarCita({ duenos, veterinarios, onClose, user }) {
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


    useEffect(() => {
        if (user && user.tipo_usuario === "dueño") {
            // Filtrar el dueño según el duenoId
            const dueno = duenos.find(d => d.id_usuario === user.id_usuario);
            if (dueno && dueno.mascota) {  // Usar `mascota` en singular
                setMascota(dueno.mascota);  // Establecer la mascota del dueño
            }
            
            setCitaData({
                duenoId: user.id_usuario,
                dueno: `${user.nombre} ${user.apellidos}` || '',
                telefono: user.telefono || '',
                email: user.email || '',
            });
        }
    }, [user, duenos]);
    

    const handleSelectDueno = (dueno) => {
        setCitaData({
            ...citaData,
            duenoId: dueno.id_usuario,
            dueno: dueno.nombre_completo,
            telefono: dueno.telefono || '',
            email: dueno.email || ''
        });
        setSearchTerm(dueno.nombre_completo);
        setFilteredDuenos([]);
        setMascota(dueno.mascota || []);
        console.log("Dueño seleccionado:", dueno);
    };
    

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

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            Inertia.post('/citas', {
                ...citaData,
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al agregar la cita');
        }
        alert('¡Cita agregada exitosamente!');
    };

    const handleCancel = () => {
        if (onClose) onClose();
    };
    return (
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
                                name="dueno"
                                placeholder="Escribe el nombre del dueño"
                                value={citaData.dueno || searchTerm}  // Muestra el nombre completo si ya está en citaData, sino muestra searchTerm
                                onChange={(e) => {
                                    if (user && user.tipo_usuario !== "dueño") {
                                        setSearchTerm(e.target.value);  // Permite filtrar la lista solo si el usuario no es dueño
                                        setCitaData({
                                            ...citaData,
                                            dueno: e.target.value,  // Actualiza el nombre del dueño si está escribiendo
                                        });
                                    }
                                }}
                                onFocus={() => setFilteredDuenos(duenos)}  // Activa la búsqueda solo cuando el usuario está interactuando con el input
                                disabled={user && user.tipo_usuario === "dueño"}  // Bloquea la edición si el usuario es dueño
                            />
                            {searchTerm && filteredDuenos.length > 0 && (
                                <ul className="autocomplete-results">
                                    {filteredDuenos.map((dueno) => (
                                        <li
                                            key={dueno.id_usuario}
                                            onClick={() => handleSelectDueno(dueno)}  // Cuando se selecciona un dueño, se asigna a citaData.dueno
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
                            disabled
                        />
                        <label>Correo:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={citaData.email || ''} 
                            onChange={handleChange} 
                            disabled
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
                                {/* Input que muestra el nombre del veterinario seleccionado o el texto de búsqueda */}
                                <input
                                    type="text"
                                    name="veterinario"
                                    placeholder="Nombre del veterinario"
                                    value={searchTermVeterinario}  // Valor del término de búsqueda
                                    onChange={(e) => setSearchTermVeterinario(e.target.value)}  // Actualizamos el término de búsqueda
                                />
                                
                                {/* Lista desplegable que muestra los veterinarios filtrados */}
                                {searchTermVeterinario && filteredVeterinarios.length > 0 && (
                                    <ul className="autocomplete-results">
                                        {filteredVeterinarios.map((veterinario) => (
                                            <li
                                                key={veterinario.id_usuario}
                                                onClick={() => handleSelectVeterinario(veterinario)}  // Selección del veterinario
                                            >
                                                {veterinario.nombre_completo}  {/* Nombre del veterinario */}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                
                                {/* Campo oculto para enviar el ID del veterinario al backend */}
                                <input 
                                    type="hidden" 
                                    name="id_veterinario"  // Este será el nombre que se envíe al backend
                                    value={citaData.id_veterinario}  // Aquí se guarda el ID del veterinario
                                />
                            </div>
                        </div>

                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">Guardar</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}