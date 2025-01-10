import React from 'react';
import './Registro.css'; // Si tienes un archivo de estilos específico

const Registro = () => {
  return (
    <div className="registro-container">
      <form className="registro-form">
        <h1 className="registro-title">Regístrate</h1>
        <p className="registro-description">
          Crea una cuenta para comenzar a donar.
        </p>
        <input
          type="text"
          placeholder="Nombre completo"
          className="registro-input"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="registro-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="registro-input"
        />
        <button type="submit" className="registro-button">
          Crear cuenta
        </button>
        <p className="registro-login-text">
          ¿Ya tienes una cuenta?{' '}
          <a href="/iniciar-sesion" className="registro-login-link">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Registro;



