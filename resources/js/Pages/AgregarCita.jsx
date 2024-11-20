
import '../../css/Citas.css';

import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';


export default function AgregarCita({ duenos, veterinarios, onClose }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDuenos, setFilteredDuenos] = useState([]);
    const [searchTermVeterinario, setSearchTermVeterinario] = useState(""); // Término de búsqueda para veterinarios
    const [filteredVeterinarios, setFilteredVeterinarios] = useState([]); // Veterinarios filtrados
    const [mascotas, setMascotas] = useState([]);
    const [isMascotaOpen, setIsMascotaOpen] = useState(false);
    const [formData, setFormData] = useState({
        duenoId: '',
        mascotaId: '',
        motivo: '',
        fecha: '',
        hora: '',
        id_veterinario: '',
        telefono: '',
        email: ''
    });

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
            console.log("Veterinarios filtrados:", veterinariosFiltrados); // Verificación de veterinarios filtrados
            setFilteredVeterinarios(veterinariosFiltrados);
        } else {
            setFilteredVeterinarios([]);
        }
    }, [searchTermVeterinario, veterinarios]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(`Campo ${e.target.name} actualizado:`, e.target.value);
    };

    const handleSelectDueno = (dueno) => {
        setFormData({
            ...formData,
            duenoId: dueno.id_usuario,
            telefono: dueno.telefono || '',
            email: dueno.email || ''
        });
        setSearchTerm(dueno.nombre_completo);
        setFilteredDuenos([]);
        setMascotas(dueno.mascotas || []);
        console.log("Dueño seleccionado:", dueno);
    };

    const handleSelectMascota = (mascota) => {
        setFormData({
            ...formData,
            mascotaId: mascota.id_mascota || ""
        });
        setIsMascotaOpen(false);
        console.log("Mascota seleccionada:", mascota);
    };

    const handleSelectVeterinario = (veterinario) => {
        setFormData({
            ...formData,
            id_veterinario: veterinario.id_usuario,  // Guardamos el ID del veterinario seleccionado
            telefono: veterinario.telefono || '',    // Si existe teléfono, lo agregamos al formulario
            email: veterinario.email || ''           // Si existe email, lo agregamos al formulario
        });
        setSearchTermVeterinario(veterinario.nombre_completo);  // Actualizamos el término de búsqueda con el nombre del veterinario
        setFilteredVeterinarios([]);  // Limpiamos los resultados filtrados
        console.log("Veterinario seleccionado:", veterinario);  // Mostramos el veterinario seleccionado en consola
    };
    
    
// Manejar el envío del formulario
const handleSubmit = (e) => {
    e.preventDefault();

    try {
        // Realizar la solicitud POST a la ruta /citas
        Inertia.post('/citas', {
            ...formData, // Datos del formulario (incluye los campos de la cita)
        });

        console.log('Datos enviados a la tabla de citas:', formData);
        alert('¡Cita agregada exitosamente!');
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un error al agregar la cita.');
    }
};

    

    const handleCancel = () => {
        if (onClose) onClose(); // Ejecuta onClose cuando se cancela el formulario
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
                            value={formData.telefono || ''} 
                            onChange={handleChange} 
                        />
                        <label>Correo:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email || ''} 
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
                                onChange={() => setIsMascotaOpen(true)}
                            />
                            {isMascotaOpen && mascotas.length > 0 && (
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
            value={formData.id_veterinario}  // Aquí se guarda el ID del veterinario
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
