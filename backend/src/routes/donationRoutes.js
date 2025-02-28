const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📌 Ruta para registrar una donación (POST /api/donations)
router.post('/', async (req, res) => {
  const { first_name, last_name, comment, phone, campaign_id } = req.body;

  if (!first_name || !last_name || !comment || !phone || !campaign_id) {
    return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios." });
  }

  try {
    const query = `
      INSERT INTO donations (amount, donation_type, status, users_iduser, campaigns_idcampaigns) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [0, 'voluntario', 'espera', 1, campaign_id]; // Ajustar valores

    await db.promise().query(query, values);

    res.status(201).json({ message: "✅ Donación registrada exitosamente." });
  } catch (error) {
    console.error("❌ Error al registrar donación:", error);
    res.status(500).json({ error: "❌ Error interno del servidor." });
  }
});

module.exports = router;
