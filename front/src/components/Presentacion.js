import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Presentacion.css';

const Presentacion = () => {
  const [stats, setStats] = useState({ totalCampaigns: 0, totalDonations: 0, totalAmount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error al obtener estadísticas:', error));
  }, []);

  return (
    <div className="presentacion-container">
      <div className="presentacion-content">
        <h1 className="presentacion-title">Bienvenido a la Plataforma de Donaciones</h1>
        <p className="presentacion-subtitle">
          Contribuye a causas importantes y ayuda a mejorar la vida de muchas personas.
        </p>

        {/* 📌 Muestra estadísticas dinámicas */}
        <div className="stats-container">
          <div className="stat-box">
            <h3>{stats.totalCampaigns}</h3>
            <p>Campañas activas</p>
          </div>
          <div className="stat-box">
            <h3>{stats.totalDonations}</h3>
            <p>Donaciones realizadas</p>
          </div>
          <div className="stat-box">
            <h3>${stats.totalAmount}</h3>
            <p>Total recaudado</p>
          </div>
        </div>

        <div className="presentacion-buttons">
          <button className="btn primary" onClick={() => navigate('/buscar')}>Explorar Campañas</button>
          <button className="btn secondary" onClick={() => navigate('/recaudar-fondos')}>Iniciar Recaudación</button>
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
