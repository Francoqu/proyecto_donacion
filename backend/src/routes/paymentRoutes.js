const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los pagos
router.get('/', (req, res) => {
    db.query('SELECT * FROM payments', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

module.exports = router;
