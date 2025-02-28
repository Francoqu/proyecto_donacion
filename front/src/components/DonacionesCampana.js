import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DonacionesCampana = () => {
  const { id } = useParams();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/campaigns/donaciones/${id}`)
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error("❌ Error al obtener donaciones:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="contenedor">
      <h1>Donaciones a la Campaña</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : donations.length > 0 ? (
        <ul className="lista-donaciones">
          {donations.map((donacion) => (
            <li key={donacion.id}>
              <p><strong>Donador:</strong> {donacion.first_name} {donacion.last_name}</p>
              <p><strong>Correo:</strong> {donacion.email}</p>
              <p><strong>Monto:</strong> ${donacion.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aún no hay donaciones para esta campaña.</p>
      )}
    </div>
  );
};

export default DonacionesCampana;
