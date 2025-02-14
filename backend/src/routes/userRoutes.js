const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Registrar usuario
router.post('/register', (req, res) => {
    const { first_name, last_name, email, id_card, phone, username, password } = req.body;

    const insertUser = `
        INSERT INTO users (first_name, last_name, email, id_card, phone)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(insertUser, [first_name, last_name, email, id_card, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = result.insertId;

        const insertAuth = `
            INSERT INTO authentication (username, password, users_iduser)
            VALUES (?, ?, ?)`;

        db.query(insertAuth, [username, password, userId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Usuario registrado con éxito' });
        });
    });
});

module.exports = router;
