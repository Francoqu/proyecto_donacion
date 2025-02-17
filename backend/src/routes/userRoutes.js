const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📌 Ruta para iniciar sesión (POST /api/users/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "⚠️ Email y contraseña son obligatorios." });
    }

    try {
        // 🔍 Buscar usuario en la base de datos
        const [user] = await db.promise().query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password]
        );

        if (user.length === 0) {
            return res.status(401).json({ error: "❌ Credenciales incorrectas." });
        }

        // ✅ Enviar datos del usuario
        const userData = {
            id: user[0].iduser,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: user[0].email,
            phone: user[0].phone,
            id_card: user[0].id_card,
            username: user[0].username
        };

        res.json(userData);
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ error: "❌ Error interno del servidor." });
    }
});

// 📌 Obtener perfil de usuario por ID (GET /api/users/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.promise().query(
            "SELECT iduser, first_name, last_name, email, phone, id_card, username FROM users WHERE iduser = ?",
            [id]
        );

        if (user.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        res.json(user[0]);
    } catch (error) {
        console.error("❌ Error al obtener el perfil:", error);
        res.status(500).json({ error: "❌ Error en el servidor al obtener el perfil." });
    }
});

module.exports = router;
