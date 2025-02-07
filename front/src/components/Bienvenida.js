import React from 'react';
import './Bienvenida.css';

const Bienvenida = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="welcome-title">Bienvenido a Nuestra Plataforma</h1>
        <p className="welcome-subtitle">
          Tu lugar para hacer la diferencia. Explora campañas, dona, o inicia tu propia recaudación de fondos.
        </p>
        <div className="welcome-actions">
          <button className="cta">Explorar Campañas</button>
          <button className="cta secondary">Iniciar Recaudación</button>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;
