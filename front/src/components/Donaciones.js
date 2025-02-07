import React, { useEffect, useState } from 'react';
import { donate, getDonations } from '../api';

const Donaciones = () => {
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');
    const [donaciones, setDonaciones] = useState([]);

    useEffect(() => {
        fetchDonaciones();
    }, []);

    const fetchDonaciones = async () => {
        const data = await getDonations();
        setDonaciones(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !monto) {
            alert('Por favor, completa todos los campos');
            return;
        }
        const response = await donate(nombre, parseFloat(monto));
        if (response.message) {
            alert('Donación realizada con éxito');
            setNombre('');
            setMonto('');
            fetchDonaciones();
        }
    };

    return (
        <div>
            <h2>Realizar una Donación</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                />
                <button type="submit">Donar</button>
            </form>

            <h2>Donaciones Recientes</h2>
            <ul>
                {donaciones.map((don, index) => (
                    <li key={index}>
                        {don.nombre} donó ${don.monto}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Donaciones;
