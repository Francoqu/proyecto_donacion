import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MisPublicaciones = ({ userId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/campaigns/mis-publicaciones/${userId}`)
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error("❌ Error al obtener campañas:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="contenedor">
      <h1>Mis Publicaciones</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : campaigns.length > 0 ? (
        <ul className="lista-campañas">
          {campaigns.map((campaña) => (
            <li key={campaña.id}>
              <h2>{campaña.nombre}</h2>
              <p>{campaña.descripcion}</p>
              <Link to={`/campana/${campaña.id}`} className="boton">
                Ver Detalles
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has publicado ninguna campaña aún.</p>
      )}
    </div>
  );
};

export default MisPublicaciones;
