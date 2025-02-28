import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [campañas, setCampañas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampañas(data.slice(0, 3))) // Tomamos solo 3 campañas para la vista previa
      .catch((error) => console.error("Error al obtener campañas:", error));
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Sección Principal */}
        <h1 className="landing-title">Contribuye a un Mejor Mañana</h1>
        <p className="landing-subtitle">
          Explora campañas solidarias y apoya una causa. Tu ayuda puede cambiar vidas. 💖✨
        </p>

        {/* Botones de Acción */}
        <div className="landing-buttons">
          <Link to="/donar" className="landing-btn primary">💖 Donar Ahora</Link>
          <Link to="/registro" className="landing-btn secondary">📝 Regístrate</Link>
        </div>

        {/* Sección de Campañas Activas */}
        <div className="campañas-container">
          {campañas.length > 0 ? (
            campañas.map((campaña) => (
              <div key={campaña.idcampaigns} className="campaña-card">
                <img src="/campañas.jpg" alt="Campaña" className="campaña-img" />
                <h3>{campaña.name}</h3>
                <p>{campaña.description}</p>
                <Link to={`/campana/${campaña.idcampaigns}`} className="ver-mas">Ver más</Link>
              </div>
            ))
          ) : (
            <p className="no-campañas">No hay campañas activas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
