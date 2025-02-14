const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las donaciones
router.get('/', (req, res) => {
    db.query('SELECT * FROM donations_partitioned', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// Registrar una donación
router.post('/', (req, res) => {
    const { donorName, amount, campaignId, donationType, status, userId } = req.body;

    const query = `
        INSERT INTO donations_partitioned (amount, donation_type, status, users_iduser, campaigns_idcampaigns) 
        VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [amount, donationType, status, userId, campaignId], (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Donación registrada con éxito", id: result.insertId });
    });
});

module.exports = router;
