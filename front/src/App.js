import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Buscar from './components/Buscar';
import Donar from './components/Donar';
import RecaudarFondos from './components/RecaudarFondos';
import AcercaDe from './components/AcercaDe';
import IniciarSesion from './components/IniciarSesion';
import Registrar from './components/Registrar';
import Perfil from './components/Perfil';
import Presentacion from './components/Presentacion';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <header className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
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
                <li>
                  <button className="logout-button" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
                
              </>
            )}
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
          <Route path="/iniciar-sesion" element={<IniciarSesion setUser={setUser} />} />
          <Route path="/registro" element={<Registrar />} />
          <Route path="/perfil/:userId" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>2025 © Plataforma de Donaciones</p>
      </footer>
    </Router>
  );
};

export default App;
