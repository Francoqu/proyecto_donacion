import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Campañas.css';

const Campañas = () => {
  const [campañas, setCampañas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/campaigns') // Llama a la API de campañas
      .then((res) => res.json())
      .then((data) => setCampañas(data))
      .catch((error) => console.error('❌ Error al obtener campañas:', error));
  }, []);

  return (
    <div className="campañas-container">
      <h1 className="campañas-title">Campañas Disponibles</h1>
      
      <div className="campañas-grid">
        {campañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            {/* ✅ Descripción de la campaña */}
            <p className="campaña-descripcion">{campaña.descripcion}</p>

            {/* ✅ Nombre de la campaña (Encima del botón "Ver Campaña") */}
            <h2 className="campaña-nombre">{campaña.nombre}</h2>

            {/* ✅ Botón "Ver Campaña" */}
            <Link to={`/campana/${campaña.id}`} className="ver-button">
              Ver Campaña
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campañas;
