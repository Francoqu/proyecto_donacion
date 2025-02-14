import React from 'react';
import './Registrar.css';

const RegistroPage = () => {
  return (
    <div className="registrar-container">
      <h1>Registro de Usuario</h1>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegistroPage;
