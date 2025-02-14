const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Conexión a MySQL

// Obtener todas las campañas con su categoría
router.get('/', (req, res) => {
    const sql = `
        SELECT campaigns.*, categories.name AS categoria
        FROM campaigns
        JOIN categories ON campaigns.categories_idcategories = categories.idcategories
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener campañas:", err);
            return res.status(500).json({ error: "Error al obtener campañas." });
        }
        res.json(result);
    });
});

module.exports = router;
