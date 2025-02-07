import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Presentacion from './components/Presentacion';
import Buscar from './components/Buscar';
import Donar from './components/Donar';
import RecaudarFondos from './components/RecaudarFondos';
import AcercaDe from './components/AcercaDe';
import IniciarSesion from './components/IniciarSesion';
import './App.css'; // Archivo CSS para el diseño

const App = () => {
  return (
    <Router>
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/buscar">Buscar</Link></li>
            <li><Link to="/donar">Donar</Link></li>
            <li><Link to="/recaudar-fondos">Recaudar fondos</Link></li>
            <li><Link to="/acerca-de">Acerca de</Link></li>
            <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Presentacion />} /> {/* ✅ Nueva Página de Presentación */}
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/recaudar-fondos" element={<RecaudarFondos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        </Routes>
      </main>

      {/* ✅ Mostrar el footer solo si NO estamos en la página de presentación */}
      <Footer />
    </Router>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    return null; // Oculta el footer en la página de presentación
  }

  return (
    <footer className="footer">
      <p>2024 Madeleine Jimenez, Franco Quesada y Jhonder Triana.</p>
    </footer>
  );
};

export default App;
