import React from 'react';
import { Inertia } from '@inertiajs/inertia'; // Importa Inertia para manejar solicitudes
import '../../css/Base.css';

export default function Base({ children }) {
    const currentPath = window.location.pathname;

    // Función para manejar el cierre de sesión
    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout')); // Enviar solicitud POST para el logout
    };

    return (
        <div className="base-layout">
            <header className="navbar">
                <img src="/assets/logo.png" alt="Logo" className="logo" />
                <nav className="nav-links">
                    <ul>
                        <li>
                            <a href="/inicio" className={`nav-link ${currentPath === '/inicio' ? 'active' : ''}`}>
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/citas" className={`nav-link ${currentPath === '/citas' ? 'active' : ''}`}>
                                Citas
                            </a>
                        </li>
                        <li>
                            <a href="/historial" className={`nav-link ${currentPath === '/historial' ? 'active' : ''}`}>
                                Historial
                            </a>
                        </li>
                        <li>
                            <a href="/agregar-mascotas" className={`nav-link ${currentPath === '/agregar-mascotas' ? 'active' : ''}`}>
                                Agregar mascotas
                            </a>
                        </li>
                        <li>
                            {/* Usa un botón para la acción de logout y llama a handleLogout */}
                            <button onClick={handleLogout} className="nav-link">
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="user-icon">👤</div>
            </header>
            <main className="content">
                {children}
            </main>
        </div>
    );
}
