import React from 'react';
import '../../css/Base.css'; // Aquí puedes agregar los estilos correspondientes

export default function Base({ children }) {
    const currentPath = window.location.pathname;

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
                            <a href="/cerrar-sesion" className={`nav-link ${currentPath === '/cerrar-sesion' ? 'active' : ''}`}>
                                Cerrar sesión
                            </a>
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
