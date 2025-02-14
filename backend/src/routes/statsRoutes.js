const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener estadísticas generales
router.get('/stats', (req, res) => {
    const statsQuery = `
        SELECT 
            (SELECT COUNT(*) FROM campaigns) AS totalCampaigns,
            (SELECT COUNT(*) FROM donations_partitioned) AS totalDonations,
            (SELECT SUM(amount) FROM donations_partitioned WHERE status = 'aceptado') AS totalAmount;
    `;
    
    db.query(statsQuery, (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results[0]);
    });
});

module.exports = router;
