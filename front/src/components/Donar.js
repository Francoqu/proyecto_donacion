import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Donar.css';

const Donar = () => {
    const { campaignId } = useParams();
    const [donationAmount, setDonationAmount] = useState('');
    const [donorName, setDonorName] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(campaignId || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Obtener campañas desde el backend
    const fetchCampaigns = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/campaigns');
            const data = await res.json();
            setCampaigns(data);
        } catch (error) {
            console.error("Error al obtener las campañas:", error);
            setCampaigns([]);
        }
    };

    // Manejo del formulario de donación
    const handleDonationSubmit = async (e) => {
        e.preventDefault();

        if (!donorName || !donationAmount || donationAmount <= 0 || !selectedCampaign) {
            setMessage('Por favor, ingresa un nombre válido, un monto mayor a 0 y selecciona una campaña.');
            return;
        }

        const donationData = {
            donorName,
            amount: parseFloat(donationAmount),
            campaignId: selectedCampaign,
            donationType: "monetario",
            status: "espera",
            userId: 1 // TODO: Cambiar por el ID real del usuario autenticado
        };

        try {
            const res = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData)
            });

            const result = await res.json();

            if (res.ok) {
                setMessage(`¡Gracias ${donorName} por tu donación de $${donationAmount}!`);
                setDonationAmount('');
                setDonorName('');
                setSelectedCampaign('');
            } else {
                setMessage(result.error || 'Hubo un error al procesar tu donación. Inténtalo de nuevo.');
            }
        } catch (error) {
            setMessage('Error en la conexión con el servidor.');
            console.error("Error al donar:", error);
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

                {/* Seleccionar campaña */}
                <select
                    className="donar-input"
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    required
                >
                    <option value="">Selecciona una campaña</option>
                    {campaigns.map(campaign => (
                        <option key={campaign.idcampaigns} value={campaign.idcampaigns}>
                            {campaign.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="donar-button">
                    Donar
                </button>
            </form>

            <div className="donar-categorias">
                {campaigns.map(campaign => (
                    <button key={campaign.idcampaigns} className="donar-button" onClick={() => setSelectedCampaign(campaign.idcampaigns)}>
                        <img src={campaign.image || "/default.jpg"} alt={campaign.name} className="donar-img" />
                        Donar a {campaign.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Donar;
