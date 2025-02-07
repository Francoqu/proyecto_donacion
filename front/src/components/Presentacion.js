import React from 'react';
import './Presentacion.css';

const Presentacion = () => {
  return (
    <div className="presentacion-container">
      <div className="presentacion-content">
        <h1 className="presentacion-title">Bienvenido a la Plataforma de Donaciones</h1>
        <p className="presentacion-subtitle">
          Contribuye a causas importantes y ayuda a mejorar la vida de muchas personas.
        </p>
        <div className="presentacion-buttons">
          <button className="btn primary">Explorar Campañas</button>
          <button className="btn secondary">Iniciar Recaudación</button>
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
