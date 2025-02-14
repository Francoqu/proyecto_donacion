import React, { useEffect, useState } from 'react';
import './AdminCampaigns.css';

const AdminCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    quantity_needed: '',
    contact: '',
    categories_idcategories: ''
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Obtener campañas desde el backend
  const fetchCampaigns = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/campaigns');
      const data = await res.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error al obtener campañas:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar edición de campaña
  const handleEdit = (campaign) => {
    setEditingCampaign(campaign.idcampaigns);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      quantity_needed: campaign.quantity_needed,
      contact: campaign.contact,
      categories_idcategories: campaign.categories_idcategories
    });
  };

  // Guardar edición o crear una nueva campaña
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingCampaign ? 'PUT' : 'POST';
    const endpoint = editingCampaign
      ? `http://localhost:5000/api/campaigns/${editingCampaign}`
      : 'http://localhost:5000/api/campaigns';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert(editingCampaign ? 'Campaña actualizada' : 'Campaña creada');
        setEditingCampaign(null);
        fetchCampaigns();
        setFormData({
          name: '',
          description: '',
          start_date: '',
          end_date: '',
          quantity_needed: '',
          contact: '',
          categories_idcategories: ''
        });
      } else {
        alert(result.error || 'Error en la operación');
      }
    } catch (error) {
      alert('Error en la conexión con el servidor');
      console.error("Error al guardar campaña:", error);
    }
  };

  // Eliminar campaña
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta campaña?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/campaigns/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Campaña eliminada');
        fetchCampaigns();
      } else {
        alert('Error al eliminar la campaña');
      }
    } catch (error) {
      alert('Error en la conexión con el servidor');
      console.error("Error al eliminar campaña:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Administración de Campañas</h1>
      
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingCampaign ? 'Editar Campaña' : 'Nueva Campaña'}</h2>
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required></textarea>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        <input type="number" name="quantity_needed" placeholder="Cantidad requerida" value={formData.quantity_needed} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contacto" value={formData.contact} onChange={handleChange} required />
        <button type="submit">{editingCampaign ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h2>Lista de Campañas</h2>
      <ul className="admin-campaign-list">
        {campaigns.map(campaign => (
          <li key={campaign.idcampaigns} className="campaign-item">
            <h3>{campaign.name}</h3>
            <p>{campaign.description}</p>
            <p><strong>Fecha:</strong> {campaign.start_date} - {campaign.end_date}</p>
            <p><strong>Meta:</strong> ${campaign.quantity_needed}</p>
            <p><strong>Contacto:</strong> {campaign.contact}</p>
            <button onClick={() => handleEdit(campaign)}>Editar</button>
            <button onClick={() => handleDelete(campaign.idcampaigns)} className="delete-btn">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCampaigns;
