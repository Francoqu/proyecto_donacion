const express = require('express');
const { getAllCampaigns } = require('../controllers/campaignController');

const router = express.Router();

// Ruta para obtener todas las campañas
router.get('/campañas', getAllCampaigns);

module.exports = router;
