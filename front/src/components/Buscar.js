import React, { useEffect, useState } from 'react';
import './Buscar.css';

const Buscar = () => {
    const [campañas, setCampañas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/campaigns');
            const data = await res.json();
            setCampañas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al obtener las campañas:", error);
            setCampañas([]);
        }
    };

    const campañasFiltradas = campañas.filter(campaña =>
        campaña?.name?.toLowerCase().includes(busqueda.toLowerCase()) &&
        (!filtroCategoria || campaña?.categoria === filtroCategoria)
    );

    return (
        <div className="buscar-container">
            <h1 className="buscar-title">Buscar Campañas</h1>
            <p className="buscar-description">Encuentra campañas activas y apoya una causa.</p>

            <input
                type="text"
                placeholder="Buscar campañas..."
                className="buscar-input"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="categoria-filtros">
                <div className="filtros-grid">
                    {['', 'Educación', 'Salud', 'Medio Ambiente', 'Animales', 'Emergencias', 'Tecnología', 'Cultura', 'Deporte'].map((categoria) => (
                        <button
                            key={categoria}
                            onClick={() => setFiltroCategoria(categoria)}
                            className={`filtro-btn ${filtroCategoria === categoria ? 'active' : ''}`}
                        >
                            {categoria || 'Todas'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="campañas-list">
                {campañasFiltradas.length > 0 ? (
                    campañasFiltradas.map((campaña) => (
                        <div key={campaña?.idcampaigns} className="campaña-card">
                            <h3>{campaña?.name}</h3>
                            <p>{campaña?.description}</p>
                            <span className="campaña-categoria">{campaña?.categoria}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-campañas">No hay campañas disponibles.</p>
                )}
            </div>

            <footer className="buscar-footer">2025 © Plataforma de Donaciones</footer>
        </div>
    );
};

export default Buscar;
