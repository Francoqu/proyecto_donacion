import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Buscar from './components/Buscar';
import Donar from './components/Donar';
import RecaudarFondos from './components/RecaudarFondos';
import AcercaDe from './components/AcercaDe';
import IniciarSesion from './components/IniciarSesion';

const App = () => {
  return (
    <Router>
      <header>
        <div className="navbar">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <nav>
            <ul>
              <li><a href="/buscar">Buscar</a></li>
              <li><a href="/donar">Donar</a></li>
              <li><a href="/recaudar-fondos">Recaudar fondos</a></li>
              <li><a href="/acerca-de">Acerca de</a></li>
              <li><a href="/iniciar-sesion">Iniciar sesión</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/recaudar-fondos" element={<RecaudarFondos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        </Routes>
      </main>

      <footer>
        <p>2024 Madeleine Jimenez, Franco Quesada y Jhonder Triana.</p>
      </footer>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
