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
      <div className="app-container">
        <Header />
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
      </div>
    </Router>
  );
};

// Componente Header (Barra de navegación)
const Header = () => {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <NavItem to="/" imgSrc="/iniciosesion.jpg" alt="Inicio" text="Inicio" />
          <NavItem to="/buscar" imgSrc="/busqueda.png" alt="Buscar" text="Buscar" />
          <NavItem to="/donar" imgSrc="/donar.png" alt="Donar" text="Donar" />
          <NavItem to="/recaudar-fondos" imgSrc="/recaudar.png" alt="Recaudar fondos" text="Recaudar fondos" />
          <NavItem to="/acerca-de" imgSrc="/acerca.png" alt="Acerca de" text="Acerca de" />
          <NavItem to="/iniciar-sesion" imgSrc="/iniciar.png" alt="Iniciar sesión" text="Iniciar sesión" />
        </ul>
      </nav>
    </header>
  );
};

// Componente reutilizable para los enlaces del navbar
const NavItem = ({ to, imgSrc, alt, text }) => {
  return (
    <li>
      <Link to={to}>
        <img src={imgSrc} alt={alt} className="nav-logo" /> {text}
      </Link>
    </li>
  );
};

// Componente Footer (se oculta en la página principal)
const Footer = () => {
  const location = useLocation();
  
  // Si estamos en la página de inicio, no mostrar el footer
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
