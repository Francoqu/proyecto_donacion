import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion = ({ setUser }) => {
  const [username, setUsername] = useState('');
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
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate(`/perfil/${data.id}`);
      } else {
        setError('⚠️ Credenciales incorrectas. Verifica tus datos.');
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🔑 Iniciar Sesión</h1>
        <p className="login-description">Accede con tus credenciales para continuar.</p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="👤 Nombre de usuario"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <p className="login-register-text">
          ¿No tienes cuenta?{' '}
          <span className="login-register-link" onClick={() => navigate('/registro')}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default IniciarSesion;
