const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener contenido de una campaña
router.get('/:campaignId', (req, res) => {
    const campaignId = req.params.campaignId;
    db.query('SELECT * FROM content WHERE campaigns_idcampaigns = ?', [campaignId], (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

module.exports = router;
