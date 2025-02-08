import React, { useEffect, useState } from 'react';
import { getCampaigns } from '../api';
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
            const data = await getCampaigns();
            if (Array.isArray(data)) {
                setCampañas(data);
            } else {
                console.error("Error: 'getCampaigns()' no devolvió un array válido.");
                setCampañas([]); // Evita que sea undefined
            }
        } catch (error) {
            console.error("Error al obtener las campañas:", error);
            setCampañas([]); // Evita que sea undefined en caso de error
        }
    };

    // Filtrar por nombre o categoría
    const campañasFiltradas = (Array.isArray(campañas) ? campañas : []).filter(campaña =>
        campaña?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtroCategoria === '' || campaña?.categoria === filtroCategoria)
    );

    return (
        <div className="buscar-container">
            <h1 className="buscar-title">Página de Buscar</h1>
            <p className="buscar-description">
                Aquí puedes buscar campañas relacionadas a diferentes categorías.
            </p>

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
            </div>

            {/* Lista de campañas */}
            <div className="campañas-list">
                {campañasFiltradas.length > 0 ? (
                    campañasFiltradas.map((campaña) => (
                        <div key={campaña?.id || Math.random()} className="campaña-card">
                            <h3>{campaña?.nombre || "Sin nombre"}</h3>
                            <p>{campaña?.descripcion || "Sin descripción disponible"}</p>
                            <span className="campaña-categoria">{campaña?.categoria || "Sin categoría"}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-campañas">No hay campañas disponibles.</p>
                )}
            </div>

            {/* Pie de página */}
            <footer className="buscar-footer">2025</footer>
        </div>
    );
};

export default Buscar;
