import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CampañaDetalle.css';

const CampañaDetalle = () => {
  const { id } = useParams();
  const [campaña, setCampaña] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/campaigns/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaña(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar la campaña');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando campaña...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="campaña-detalle">
      <h1>{campaña.nombre}</h1>
      <p><strong>Descripción:</strong> {campaña.descripcion}</p>
      <p><strong>Meta de Donación:</strong> ${campaña.meta}</p>
      <p><strong>Recaudado:</strong> ${campaña.recaudado}</p>
    </div>
  );
};

export default CampañaDetalle;
