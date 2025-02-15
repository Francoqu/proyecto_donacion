const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Conexión a MySQL

// 📌 Ruta para iniciar sesión (POST /api/users/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "⚠️ Email y contraseña son obligatorios." });
    }

    try {
        // 🔍 Buscar usuario por email y contraseña
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
            email: user[0].email
        };

        res.json(userData);
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ error: "❌ Error interno del servidor." });
    }
});

module.exports = router;
