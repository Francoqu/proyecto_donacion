import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Presentacion from './components/Presentacion'; // ✅ Agregado
import Buscar from './components/Buscar';
import Donar from './components/Donar';
import RecaudarFondos from './components/RecaudarFondos';
import AcercaDe from './components/AcercaDe';
import IniciarSesion from './components/IniciarSesion';
import Registrar from './components/Registrar'; // ✅ Agregado

const App = () => {
  return (
    <Router>
      <header>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li> {/* ✅ Agregado para que el Inicio sea visible */}
              <li><Link to="/buscar">Buscar</Link></li>
              <li><Link to="/donar">Donar</Link></li>
              <li><Link to="/recaudar-fondos">Recaudar fondos</Link></li>
              <li><Link to="/acerca-de">Acerca de</Link></li>
              <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
              <li><Link to="/registro">Registrarse</Link></li> {/* ✅ Agregado */}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Presentacion />} /> {/* ✅ Agregado: Página de Presentación */}
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/recaudar-fondos" element={<RecaudarFondos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registro" element={<Registrar />} /> 
        </Routes>
      </main>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
