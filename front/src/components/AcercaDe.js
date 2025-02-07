import React from 'react';
import './AcercaDe.css';

const AcercaDe = () => {
  return (
    <div className="acerca-container">
      <h1 className="acerca-title">Sobre Nosotros</h1>
      <p className="acerca-description">
        Nuestra misión es crear un impacto positivo en la sociedad a través de donaciones y apoyo a diversas causas.
      </p>

      {/* Secciones de impacto */}
      <div className="acerca-impacto">
        <div className="impacto-card">
          <img src="/educacion.jpg" alt="Educación" className="impacto-img" />
          <h3>Impacto en Educación</h3>
          <p>Hemos brindado oportunidades educativas a miles de niños en comunidades desfavorecidas.</p>
        </div>

        <div className="impacto-card">
          <img src="/salud.jpg" alt="Salud" className="impacto-img" />
          <h3>Impacto en Salud</h3>
          <p>Ofrecemos atención médica y medicamentos a quienes más lo necesitan.</p>
        </div>

        <div className="impacto-card">
          <img src="/medioambiente.jpg" alt="Medio Ambiente" className="impacto-img" />
          <h3>Impacto en Medio Ambiente</h3>
          <p>Hemos liderado proyectos de reforestación y protección del ecosistema.</p>
        </div>
      </div>

      {/* Sección de agradecimiento */}
      <footer className="acerca-footer">
        <p>Gracias a nuestros donantes y voluntarios, seguimos marcando la diferencia. 🌍❤️</p>
      </footer>
    </div>
  );
};

export default AcercaDe;
