import React, { useState } from 'react';
import { donate } from '../api';
import './Donar.css';

const Donar = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const [donorName, setDonorName] = useState('');
    const [message, setMessage] = useState('');

    const handleDonationSubmit = async (e) => {
        e.preventDefault();

        if (!donorName || !donationAmount || donationAmount <= 0) {
            setMessage('Por favor, ingresa un nombre válido y un monto mayor a 0.');
            return;
        }

        const response = await donate(donorName, parseFloat(donationAmount));
        if (response && response.message) {
            setMessage(`¡Gracias ${donorName} por tu donación de $${donationAmount}!`);
            setDonationAmount('');
            setDonorName('');
        } else {
            setMessage('Hubo un error al procesar tu donación. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="donar-container">
            <form className="donar-form" onSubmit={handleDonationSubmit}>
                <h1 className="donar-title">Donar</h1>
                <p className="donar-description">
                    Contribuye con una causa y marca la diferencia. Ingresa tus datos a continuación para realizar una donación.
                </p>

                {message && <p className="donar-message">{message}</p>}

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

            <div className="donar-categorias">
                <button className="donar-button">
                    <img src="/educacion.jpg" alt="Educación" className="donar-img" />
                    Donar a Educación
                </button>
                <button className="donar-button">
                    <img src="/salud.jpg" alt="Salud" className="donar-img" />
                    Donar a Salud
                </button>
                <button className="donar-button">
                    <img src="/medioambiente.jpg" alt="Medio Ambiente" className="donar-img" />
                    Donar a Medio Ambiente
                </button>
            </div>
        </div>
    );
};

export default Donar;
