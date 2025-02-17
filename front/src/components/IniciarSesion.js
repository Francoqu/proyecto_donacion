import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data)); // Guardar usuario en localStorage
        setUser(data); // Actualizar estado global de usuario
        navigate(`/perfil/${data.id}`);
      } else {
        setError(data.error || '❌ Credenciales incorrectas.');
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="iniciar-container">
      <form className="iniciar-form" onSubmit={handleLogin}>
        <h1 className="iniciar-title">Iniciar Sesión</h1>
        <p className="iniciar-description">
          Ingresa tus credenciales para acceder.
        </p>

        {error && <p className="iniciar-error">{error}</p>}

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="iniciar-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="iniciar-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="iniciar-button">
          🔑 Iniciar Sesión
        </button>
        <p className="iniciar-register-text">
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="iniciar-register-link">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default IniciarSesion;
