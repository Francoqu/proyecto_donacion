import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import Buscar from './components/Buscar';
import Donar from './components/Donar';
import RecaudarFondos from './components/RecaudarFondos';
import AcercaDe from './components/AcercaDe';
import IniciarSesion from './components/IniciarSesion';
import Registrar from './components/Registrar';
import Perfil from './components/Perfil';
import Presentacion from './components/Presentacion';
import './App.css';

// 📌 Componente para manejar el layout y la navegación
const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" className="logo-img" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/buscar">Buscar</Link></li>
          <li><Link to="/donar">Donar</Link></li>
          <li><Link to="/recaudar-fondos">Recaudar fondos</Link></li>
          <li><Link to="/acerca-de">Acerca de</Link></li>
          {user ? (
            <>
              <li><Link to={`/perfil/${user.id}`}>Perfil</Link></li>
              <li><button className="logout-button" onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
              <li><Link to="/registrar">Registrarse</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Layout user={user} setUser={setUser} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/recaudar-fondos" element={<RecaudarFondos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion setUser={setUser} />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/perfil/:userId" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" />} />  {/* Redirección a Inicio en rutas inválidas */}
        </Routes>
      </main>
      <footer className="footer">
        <p>2025 © Plataforma de Donaciones</p>
      </footer>
    </Router>
  );
};

export default App;
