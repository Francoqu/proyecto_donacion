import React, { useState, useEffect } from 'react';
import './RecaudarFondos.css';

const RecaudarFondos = () => {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    cantidad: '',
    contacto: '',
    categoriaId: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Obtener categorías desde el backend
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setCategorias([]);
    }
  };

  // Manejo del formulario de creación de campaña
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.fechaInicio || !formData.fechaFin || !formData.cantidad || !formData.contacto || !formData.categoriaId) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    const campaignData = {
      name: formData.nombre,
      description: formData.descripcion,
      start_date: formData.fechaInicio,
      end_date: formData.fechaFin,
      quantity_needed: parseFloat(formData.cantidad),
      contact: formData.contacto,
      categories_idcategories: formData.categoriaId
    };

    try {
      const res = await fetch('http://localhost:5000/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });

      const result = await res.json();

      if (res.ok) {
        setMensaje(`¡La campaña "${formData.nombre}" ha sido creada con éxito!`);
        setFormData({
          nombre: '',
          descripcion: '',
          fechaInicio: '',
          fechaFin: '',
          cantidad: '',
          contacto: '',
          categoriaId: ''
        });
      } else {
        setMensaje(result.error || 'Hubo un error al registrar la campaña.');
      }
    } catch (error) {
      setMensaje('Error en la conexión con el servidor.');
      console.error("Error al registrar campaña:", error);
    }
  };

  return (
    <div className="contenedor">
      <div className="formulario">
        <h1 className="titulo">Crear Campaña</h1>
        <p className="subtitulo">Ingresa los detalles de tu campaña.</p>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre de la campaña" className="campo" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
          <textarea name="descripcion" placeholder="Descripción de la campaña" className="campo" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} required></textarea>

          <div className="fechas">
            <input type="date" name="fechaInicio" className="campo" value={formData.fechaInicio} onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })} required />
            <input type="date" name="fechaFin" className="campo" value={formData.fechaFin} onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })} required />
          </div>

          <input type="number" name="cantidad" placeholder="Cantidad requerida" className="campo" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })} required />
          <input type="text" name="contacto" placeholder="Persona de contacto" className="campo" value={formData.contacto} onChange={(e) => setFormData({ ...formData, contacto: e.target.value })} required />

          {/* Seleccionar categoría */}
          <select name="categoriaId" className="campo" value={formData.categoriaId} onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.idcategories} value={cat.idcategories}>{cat.name}</option>
            ))}
          </select>

          <button type="submit" className="boton">Guardar Campaña</button>
        </form>
      </div>
    </div>
  );
};

export default RecaudarFondos;
