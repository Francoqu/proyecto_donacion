const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener insignias de un usuario
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM insignia WHERE users_iduser = ?', [userId], (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

module.exports = router;
