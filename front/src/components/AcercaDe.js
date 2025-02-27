import React from 'react';
import './AcercaDe.css';

const AcercaDe = () => {
  return (
    <div className="acerca-container">
      {/* 🔹 Título Principal */}
      <h1 className="acerca-title">Sobre Nosotros</h1>
      <p className="acerca-description">
        Nuestra misión es crear un impacto positivo en la sociedad a través de donaciones y apoyo a diversas causas.
      </p>

      {/* 🔹 Nueva Sección: Nuestra Historia */}
      <section className="acerca-historia">
        <h2 className="historia-title">Nuestra Historia</h2>
        <p className="historia-text">
          Desde nuestros inicios, hemos trabajado arduamente para conectar a personas solidarias con causas importantes. Gracias a nuestra comunidad, hemos logrado impactar vidas y generar cambios significativos en educación, salud y medio ambiente.
        </p>
      </section>

      {/* 🔹 Secciones de impacto */}
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

      {/* 🔹 Nueva Sección: Nuestro Equipo */}
      <section className="acerca-equipo">
        <h2 className="equipo-title">Nuestro Equipo</h2>
        <div className="equipo-container">
          <div className="equipo-card">
            <img src="/fundador.jpg" alt="Fundador" className="equipo-img" />
            <h4>Juan Pérez</h4>
            <p>Fundador y CEO</p>
          </div>
          <div className="equipo-card">
            <img src="/directora.jpg" alt="Directora" className="equipo-img" />
            <h4>María González</h4>
            <p>Directora de Proyectos</p>
          </div>
          <div className="equipo-card">
            <img src="/coordinador.jpg" alt="Coordinador" className="equipo-img" />
            <h4>Carlos Ramírez</h4>
            <p>Coordinador de Voluntarios</p>
          </div>
        </div>
      </section>

      {/* 🔹 Sección de Agradecimiento */}
      <footer className="acerca-footer">
        <p>Gracias a nuestros donantes y voluntarios, seguimos marcando la diferencia. 🌍❤️</p>
      </footer>
    </div>
  );
};

export default AcercaDe;
