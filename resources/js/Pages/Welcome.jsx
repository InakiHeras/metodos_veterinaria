// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Head } from '@inertiajs/react';
import logo from './assets/logo.png';
import gato from './assets/gato.png';

import Welcome from './Welcome';

function Home() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('./assets/nube.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="flex justify-between items-center p-5 bg-white bg-opacity-80 shadow w-full fixed top-0 z-10">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <nav>
          <ul className="flex gap-5">
            <li><a href="#nosotros" className="text-gray-800 font-bold">Nosotros</a></li>
            <li><a href="#blog" className="text-gray-800 font-bold">Blog</a></li>
            <li><a href="#services" className="text-gray-800 font-bold">Servicios</a></li>
            <li><a href="#appointment" className="text-gray-800 font-bold">Agendar cita</a></li>
            <li><a href="#contact" className="text-gray-800 font-bold">Contacto</a></li>
          </ul>
        </nav>
        <div className="flex gap-3">
          <button className="text-xl">🔍</button>
          <button className="text-xl">👤</button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center mt-20 p-5">
        <section className="flex items-center justify-between max-w-5xl w-full p-10">
          <div className="w-1/3">
            <h2 className="text-pink-500 font-bold text-lg">NOS IMPORTA TU MASCOTA</h2>
            <h1 className="text-2xl font-bold text-gray-900 my-3">
              Atención especializada y de emergencia para mascotas
            </h1>
            <p className="text-gray-600 mb-5">
              En Pet Society, entendemos que tus mascotas son parte de tu familia. Con 23 casi 24 años de experiencia, estamos comprometidos a proporcionar el más alto nivel de atención médica, bienestar y amor para tus compañeros de vida.
            </p>
            <div className="flex items-center bg-pink-200 bg-opacity-80 p-2 rounded-lg">
              <input
                type="text"
                placeholder="Código postal, dirección o ciudad"
                className="p-2 text-sm border border-gray-300 rounded-l-md w-60"
              />
              <button className="p-2 text-sm bg-pink-500 text-white rounded-r-md">Encuentra una clínica</button>
            </div>
          </div>
          <img src={gato} alt="Gato" className="w-72" />
        </section>
      </main>

      <footer className="bg-opacity-80 text-gray-800 py-5 text-sm mt-auto">
        <div className="flex justify-center space-x-5">
          <a href="#instagram" className="hover:text-pink-500">Instagram</a>
          <a href="#facebook" className="hover:text-pink-500">Facebook</a>
          <a href="#twitter" className="hover:text-pink-500">Twitter</a>
          <a href="#linkedin" className="hover:text-pink-500">LinkedIn</a>
        </div>
        <div className="flex justify-center space-x-5 mt-2">
          <a href="#location" className="hover:text-pink-500">Ubicación</a>
          <a href="#hours" className="hover:text-pink-500">Horarios</a>
          <a href="#specialty" className="hover:text-pink-500">Especialidades</a>
          <a href="#terms" className="hover:text-pink-500">Términos y condiciones</a>
          <a href="#privacy" className="hover:text-pink-500">Política de privacidad</a>
        </div>
        <p className="text-center mt-2">&copy; 2024 Pet Society México. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function App({ auth, laravelVersion, phpVersion }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para la página de inicio */}
        <Route 
          path="/welcome" 
          element={<Welcome auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />} 
        /> {/* Ruta para el componente de autenticación */}
      </Routes>
    </Router>
  );
}

export default App;
