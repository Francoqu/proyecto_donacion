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
            <li>
              <Link to="/">
                <img src="/iniciosesion.jpg" alt="Inicio" className="nav-logo" /> Inicio
              </Link>
            </li>
            <li>
              <Link to="/buscar">
                <img src="/busqueda.png" alt="Buscar" className="nav-logo" /> Buscar
              </Link>
            </li>
            <li>
              <Link to="/donar">
                <img src="/donar.png" alt="Donar" className="nav-logo" /> Donar
              </Link>
            </li>
            <li>
              <Link to="/recaudar-fondos">
                <img src="/recaudar.png" alt="Recaudar fondos" className="nav-logo" /> Recaudar fondos
              </Link>
            </li>
            <li>
              <Link to="/acerca-de">
                <img src="/acerca.png" alt="Acerca de" className="nav-logo" /> Acerca de
              </Link>
            </li>
            <li>
              <Link to="/iniciar-sesion">
                <img src="/iniciar.png" alt="Iniciar sesión" className="nav-logo" /> Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/recaudar-fondos" element={<RecaudarFondos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  return (
    <footer className="footer">
      <p>2024 Madeleine Jimenez, Franco Quesada y Jhonder Triana.</p>
    </footer>
  );
};

export default App;
