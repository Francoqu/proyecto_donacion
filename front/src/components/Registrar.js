import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '', // Se mantiene si es necesario, si no lo usas, elimínalo
    password: '',
    id_card: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Usuario registrado con éxito.');
        navigate('/iniciar-sesion'); // Redirige a la página de inicio de sesión
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

        <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />

        {/* Campo de usuario (Opcional, puedes eliminarlo si usas solo email) */}
        <input type="text" name="username" placeholder="Nombre de Usuario" onChange={handleChange} required />

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
