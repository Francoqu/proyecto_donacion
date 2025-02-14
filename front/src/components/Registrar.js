import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
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
        navigate('/iniciar-sesion');
      } else {
        setError(data.error || 'Error al registrar usuario.');
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        {error && <p className="register-error">{error}</p>}
        <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Usuario" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="number" name="id_card" placeholder="Cédula" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono (opcional)" onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registrar;
