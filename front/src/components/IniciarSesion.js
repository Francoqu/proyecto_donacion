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
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🔐 Iniciar Sesión</h1>
        <p className="login-description">Ingresa tus credenciales para acceder.</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Correo Electrónico"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔑 Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            🚀 Iniciar Sesión
          </button>
        </form>

        <p className="login-register-text">
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="login-register-link">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default IniciarSesion;
