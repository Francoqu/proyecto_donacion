import React, { useState } from 'react';
import './RecaudarFondos.css';

const RecaudarFondos = () => {
  const [campañaSeleccionada, setCampañaSeleccionada] = useState(null);

  const campañas = ['Educación', 'Salud', 'Medio Ambiente'];

  const formularioCampaña = () => (
    <div className="formulario">
      <h1 className="titulo">{campañaSeleccionada}</h1>
      <form>
        <input
          type="text"
          placeholder="Nombre de la campaña"
          className="campo"
        />
        <textarea
          placeholder="Descripción de la campaña"
          className="campo"
        ></textarea>
        <div className="fechas">
          <input type="date" className="campo" />
          <input type="date" className="campo" />
        </div>
        <input
          type="number"
          placeholder="Cantidad requerida"
          className="campo"
        />
        <input
          type="text"
          placeholder="Persona de contacto"
          className="campo"
        />
        <button type="submit" className="boton">Guardar Campaña</button>
      </form>
      <button
        onClick={() => setCampañaSeleccionada(null)}
        className="boton boton-regresar"
      >
        Regresar
      </button>
    </div>
  );

  return (
    <div className="contenedor">
      {campañaSeleccionada ? (
        formularioCampaña()
      ) : (
        <div className="formulario">
          <h1 className="titulo">Recaudación de Fondos</h1>
          <p className="subtitulo">
            Selecciona una campaña para gestionar la información:
          </p>
          {campañas.map((campaña, indice) => (
            <button
              key={indice}
              className="boton"
              onClick={() => setCampañaSeleccionada(campaña)}
            >
              {campaña}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecaudarFondos;
