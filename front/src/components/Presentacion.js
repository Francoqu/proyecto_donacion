import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Presentacion.css';

const Presentacion = () => {
  const navigate = useNavigate();

  return (
    <div className="presentacion-container">
      <div className="presentacion-content">
        {/* 🔹 Sección de Texto */}
        <div className="presentacion-text">
          <h1 className="presentacion-title">🌍 Solidaridad en Loja: Juntos por un Futuro Mejor</h1>
          <p className="presentacion-subtitle">
            Nuestra misión es ayudar a quienes más lo necesitan en la ciudad de Loja. Con tu donación, podemos brindar apoyo en salud, educación, vivienda y emergencias a cientos de personas en situación vulnerable.
          </p>

          {/* 🔹 Beneficios */}
          <div className="presentacion-description">
            <p>Tu generosidad hace la diferencia. Gracias a las contribuciones de personas como tú, hemos logrado:</p>
            <ul>
              <li>✅ Proveer alimentos y ropa a familias necesitadas.</li>
              <li>✅ Financiar tratamientos médicos urgentes.</li>
              <li>✅ Apoyar la educación de niños y jóvenes en riesgo.</li>
              <li>✅ Brindar refugio a personas en situación de calle.</li>
            </ul>
            <p>Únete a nuestra comunidad solidaria y sé parte del cambio en Loja. 💖</p>
          </div>

          {/* 🔹 Botones de Acción */}
          <div className="presentacion-buttons">
            <button className="btn primary" onClick={() => navigate('/buscar')}>🔍 Explorar Campañas</button>
            <button className="btn secondary" onClick={() => navigate('/recaudar-fondos')}>💡 Iniciar una Recaudación</button>
          </div>
        </div>

        {/* 🔹 Imagen Representativa */}
        <div className="presentacion-image">
          <img src="/donar.png" alt="Donar" className="donar-img"/>
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
