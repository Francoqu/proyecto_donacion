const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📌 Obtener todas las campañas
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM campaigns");
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener campañas:", error);
        res.status(500).json({ error: "Error al cargar las campañas." });
    }
});

// 📌 Obtener una sola campaña por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.promise().query("SELECT * FROM campaigns WHERE idcampaigns = ?", [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Campaña no encontrada." });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("❌ Error al obtener campaña:", error);
        res.status(500).json({ error: "Error al cargar la campaña." });
    }
});

module.exports = router;
