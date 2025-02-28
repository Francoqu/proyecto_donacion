import React, { useState, useEffect } from 'react';
import './Donar.css';

const Donar = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    comment: '',
    phone: '',
    campaign_id: '',
  });

  const [campaigns, setCampaigns] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar la lista de campañas desde la API
    fetch('http://localhost:5000/api/campaigns')
      .then(response => response.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error('Error al obtener campañas:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Donación registrada exitosamente.');
        setFormData({
          first_name: '',
          last_name: '',
          comment: '',
          phone: '',
          campaign_id: '',
        });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="donar-container">
      <h1>Realizar una Donación</h1>
      {message && <p className="donar-message">{message}</p>}

      <form className="donar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Apellidos"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <textarea
          name="comment"
          placeholder="Comentario"
          value={formData.comment}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Número de Contacto"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select name="campaign_id" value={formData.campaign_id} onChange={handleChange} required>
          <option value="">Selecciona una Campaña</option>
          {campaigns.map((campaign) => (
            <option key={campaign.idcampaigns} value={campaign.idcampaigns}>
              {campaign.name}
            </option>
          ))}
        </select>

        <button type="submit">Enviar Donación</button>
      </form>
    </div>
  );
};

export default Donar;
