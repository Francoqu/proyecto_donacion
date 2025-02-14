const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📌 Obtener todas las campañas
router.get('/campaigns', (req, res) => {
    db.query('SELECT * FROM campaigns', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todas las categorías
router.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todas las donaciones
router.get('/donations', (req, res) => {
    db.query('SELECT * FROM donations_partitioned', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todas las ciudades
router.get('/cities', (req, res) => {
    db.query('SELECT * FROM cities', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todos los sectores
router.get('/sectors', (req, res) => {
    db.query('SELECT * FROM sectors', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todas las insignias
router.get('/insignias', (req, res) => {
    db.query('SELECT * FROM insignia', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener todas las donaciones de un usuario
router.get('/user/:id/donations', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM donations_partitioned WHERE users_iduser = ?', [userId], (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Obtener información de usuario
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE iduser = ?', [userId], (err, userResults) => {
        if (err) res.status(500).json({ error: err.message });
        else if (userResults.length === 0) res.status(404).json({ message: 'Usuario no encontrado' });
        else res.json(userResults[0]);
    });
});

// 📌 Obtener contenido asociado a una campaña
router.get('/campaigns/:id/content', (req, res) => {
    const campaignId = req.params.id;
    db.query('SELECT * FROM content WHERE campaigns_idcampaigns = ?', [campaignId], (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

// 📌 Registrar un usuario
router.post('/register', (req, res) => {
    const { first_name, last_name, email, id_card, phone, username, password } = req.body;
    db.query('INSERT INTO users (first_name, last_name, email, id_card, phone) VALUES (?, ?, ?, ?, ?)', 
        [first_name, last_name, email, id_card, phone], (err, userResult) => {
        if (err) res.status(500).json({ error: err.message });
        else {
            db.query('INSERT INTO authentication (username, password, users_iduser) VALUES (?, ?, ?)', 
                [username, password, userResult.insertId], (err) => {
                if (err) res.status(500).json({ error: err.message });
                else res.json({ message: 'Usuario registrado exitosamente' });
            });
        }
    });
});

module.exports = router;
