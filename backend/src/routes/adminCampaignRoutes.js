const express = require('express');
const router = express.Router();

// Ruta de prueba para administración de campañas
router.get('/', (req, res) => {
    res.json({ message: 'Admin Campaigns API funcionando 🚀' });
});

module.exports = router;
