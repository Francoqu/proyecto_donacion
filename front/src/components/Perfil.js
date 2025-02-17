import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Perfil.css'; // ✅ Agregado para estilos

const Perfil = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);

        if (!response.ok) throw new Error('No se encontró el usuario.');

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <p className="perfil-loading">⏳ Cargando perfil...</p>;
  if (error) return <p className="perfil-error">❌ {error}</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1 className="perfil-title">👤 {user.first_name} {user.last_name}</h1>
        <p><strong>📧 Email:</strong> {user.email}</p>
        <p><strong>📞 Teléfono:</strong> {user.phone || 'No disponible'}</p>
        <p><strong>🆔 Cédula:</strong> {user.id_card}</p>
        <p><strong>👥 Usuario:</strong> {user.username}</p>
      </div>
    </div>
  );
};

export default Perfil;
