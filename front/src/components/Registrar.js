import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    id_card: '',
    phone: '',
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
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Usuario registrado con éxito. Redirigiendo...');
        setTimeout(() => {
          navigate('/iniciar-sesion');
        }, 2000); // Redirige a iniciar sesión después de 2 segundos
      } else {
        setError(data.error || '❌ Error al registrar usuario.');
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="registrar-container">
      <form className="registrar-form" onSubmit={handleSubmit}>
        <h1 className="registrar-title">Registro</h1>

        {error && <p className="registrar-error">{error}</p>}
        {success && <p className="registrar-success">{success}</p>}

        <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="number" name="id_card" placeholder="Cédula" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono (opcional)" onChange={handleChange} />

        <button type="submit">Registrarse</button>

        <p className="registrar-login-text">
          ¿Ya tienes cuenta? <a href="/iniciar-sesion">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Registrar;
