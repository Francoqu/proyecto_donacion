const Donation = require('../models/donationModel');

// Controlador para agregar una donación
const createDonation = (req, res) => {
    const { nombre, monto } = req.body;

    if (!nombre || !monto) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    Donation.addDonation(nombre, monto, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar la donación' });
        }
        res.status(201).json({ message: 'Donación registrada con éxito', id: result.insertId });
    });
};

// Controlador para obtener todas las donaciones
const getAllDonations = (req, res) => {
    Donation.getDonations((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las donaciones' });
        }
        res.status(200).json(results);
    });
};

module.exports = { createDonation, getAllDonations };
