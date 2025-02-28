import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Inicio de sesión exitoso. Redirigiendo...');
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setTimeout(() => {
          navigate(`/perfil/${data.id}`);
        }, 2000);
      } else {
        setError(data.error || '❌ Credenciales incorrectas.');
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="iniciar-container">
      <form className="iniciar-form" onSubmit={handleSubmit}>
        <h1 className="iniciar-title">Iniciar Sesión</h1>

        {error && <p className="iniciar-error">{error}</p>}
        {success && <p className="iniciar-success">{success}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="iniciar-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="iniciar-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="iniciar-button">Iniciar Sesión</button>

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
