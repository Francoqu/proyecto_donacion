import React, { useState } from 'react';
import './Donar.css';

const Donar = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${donorName} por tu donación de $${donationAmount}`);
    setDonationAmount('');
    setDonorName('');
  };

  return (
    <div className="donar-container">
      <form className="donar-form" onSubmit={handleDonationSubmit}>
        <h1 className="donar-title">Donar</h1>
        <p className="donar-description">
          Contribuye con una causa y marca la diferencia. Ingresa tus datos a continuación para realizar una donación.
        </p>
        <input
          type="text"
          placeholder="Tu nombre"
          className="donar-input"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto a donar"
          className="donar-input"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          required
        />
        <button type="submit" className="donar-button">
          Donar
        </button>
      </form>

      {/* Botón de Educación con imagen */}
      <button className="donar-button">
        <img src="/educacion.jpg" alt="Educación" className="donar-img" />
        Donar a Educación
      </button>
    </div>
  );
};

export default Donar;
