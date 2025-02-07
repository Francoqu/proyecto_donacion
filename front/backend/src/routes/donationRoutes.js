const express = require('express');
const { createDonation, getAllDonations } = require('../controllers/donationController');

const router = express.Router();

// Ruta para agregar una donación
router.post('/donar', createDonation);

// Ruta para obtener todas las donaciones
router.get('/donaciones', getAllDonations);

module.exports = router;
