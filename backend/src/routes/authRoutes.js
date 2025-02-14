const express = require('express');
const db = require('../config/db');
const router = express.Router();
const bcrypt = require('bcrypt');

// 📌 Registro de usuario
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, username, password, id_card, phone } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (first_name, last_name, email, id_card, phone) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, id_card, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al registrar usuario' });

      const userId = result.insertId;
      db.query(
        'INSERT INTO authentication (username, password, users_iduser) VALUES (?, ?, ?)',
        [username, hashedPassword, userId],
        (err) => {
          if (err) return res.status(500).json({ error: 'Error al registrar credenciales' });

          res.status(201).json({ message: 'Usuario registrado con éxito' });
        }
      );
    }
  );
});

// 📌 Inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM authentication WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error de servidor' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    db.query(
      'SELECT * FROM users WHERE iduser = ?',
      [user.users_iduser],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener datos del usuario' });

        res.json({ id: user.users_iduser, ...result[0] });
      }
    );
  });
});

module.exports = router;
