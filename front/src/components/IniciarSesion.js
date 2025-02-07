import React from 'react';
import './IniciarSesion.css';

const IniciarSesion = () => {
  return (
    <div className="iniciar-container">
      <form className="iniciar-form">
        <h1 className="iniciar-title">Iniciar Sesión</h1>
        <p className="iniciar-description">
          Accede con tus credenciales o regístrate para empezar a donar.
        </p>
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="iniciar-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="iniciar-input"
        />
        <button type="submit" className="iniciar-button">
          Iniciar Sesión
        </button>
        <p className="iniciar-register-text">
          ¿No tienes cuenta?{' '}
          <a href="#" className="iniciar-register-link">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
};

export default IniciarSesion;
