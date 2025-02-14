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
            if (Array.isArray(data)) {
                setCampañas(data);
            } else {
                console.error("Error: Datos no válidos");
                setCampañas([]);
            }
        } catch (error) {
            console.error("Error al obtener las campañas:", error);
            setCampañas([]);
        }
    };

    const campañasFiltradas = campañas.filter(campaña =>
        campaña?.name?.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtroCategoria === '' || campaña?.categoria === filtroCategoria)
    );

    return (
        <div className="buscar-container">
            <h1 className="buscar-title">Buscar Campañas</h1>
            <p className="buscar-description">Encuentra campañas activas y apoya una causa.</p>

            {/* Barra de búsqueda */}
            <input
                type="text"
                placeholder="Buscar campañas..."
                className="buscar-input"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* Filtros de categoría */}
            <div className="categoria-filtros">
                <button onClick={() => setFiltroCategoria('')} className={filtroCategoria === '' ? 'active' : ''}>Todas</button>
                <button onClick={() => setFiltroCategoria('Educación')} className={filtroCategoria === 'Educación' ? 'active' : ''}>Educación</button>
                <button onClick={() => setFiltroCategoria('Salud')} className={filtroCategoria === 'Salud' ? 'active' : ''}>Salud</button>
                <button onClick={() => setFiltroCategoria('Medio Ambiente')} className={filtroCategoria === 'Medio Ambiente' ? 'active' : ''}>Medio Ambiente</button>
                <button onClick={() => setFiltroCategoria('Animales')} className={filtroCategoria === 'Animales' ? 'active' : ''}>Animales</button>
                <button onClick={() => setFiltroCategoria('Emergencias')} className={filtroCategoria === 'Emergencias' ? 'active' : ''}>Emergencias</button>
                <button onClick={() => setFiltroCategoria('Tecnología')} className={filtroCategoria === 'Tecnología' ? 'active' : ''}>Tecnología</button>
                <button onClick={() => setFiltroCategoria('Cultura')} className={filtroCategoria === 'Cultura' ? 'active' : ''}>Cultura</button>
                <button onClick={() => setFiltroCategoria('Deporte')} className={filtroCategoria === 'Deporte' ? 'active' : ''}>Deporte</button>
            </div>

            {/* Lista de campañas */}
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

            {/* Pie de página */}
            <footer className="buscar-footer">2025 © Plataforma de Donaciones</footer>
        </div>
    );
};

export default Buscar;
