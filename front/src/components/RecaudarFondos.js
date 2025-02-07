import React, { useState } from 'react';
import './RecaudarFondos.css';

const RecaudarFondos = () => {
  const [campañaSeleccionada, setCampañaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    cantidad: '',
    contacto: '',
  });
  const [mensaje, setMensaje] = useState('');

  const campañas = ['Educación', 'Salud', 'Medio Ambiente'];

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.descripcion || !formData.fechaInicio || !formData.fechaFin || !formData.cantidad || !formData.contacto) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }
    setMensaje(`¡La campaña "${formData.nombre}" ha sido guardada con éxito!`);
    setFormData({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      cantidad: '',
      contacto: '',
    });
  };

  return (
    <div className="contenedor">
      {campañaSeleccionada ? (
        <div className="formulario">
          <h1 className="titulo">{campañaSeleccionada}</h1>
          {mensaje && <p className="mensaje">{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la campaña"
              className="campo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción de la campaña"
              className="campo"
              value={formData.descripcion}
              onChange={handleChange}
              required
            ></textarea>
            <div className="fechas">
              <input
                type="date"
                name="fechaInicio"
                className="campo"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="fechaFin"
                className="campo"
                value={formData.fechaFin}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad requerida"
              className="campo"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contacto"
              placeholder="Persona de contacto"
              className="campo"
              value={formData.contacto}
              onChange={handleChange}
              required
            />
            <button type="submit" className="boton">Guardar Campaña</button>
          </form>
          <button onClick={() => setCampañaSeleccionada(null)} className="boton boton-regresar">
            Regresar
          </button>
        </div>
      ) : (
        <div className="formulario">
          <h1 className="titulo">Recaudación de Fondos</h1>
          <p className="subtitulo">Selecciona una campaña para gestionar la información:</p>
          {campañas.map((campaña, indice) => (
            <button key={indice} className="boton" onClick={() => setCampañaSeleccionada(campaña)}>
              {campaña}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecaudarFondos;
