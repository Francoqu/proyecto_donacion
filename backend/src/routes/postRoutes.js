const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📌 Ruta para obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        const [posts] = await db.promise().query(`
            SELECT posts.idpost, posts.title, posts.content, posts.created_at, users.first_name, users.last_name 
            FROM posts 
            INNER JOIN users ON posts.author_id = users.iduser
            ORDER BY posts.created_at DESC
        `);
        res.json(posts);
    } catch (error) {
        console.error("❌ Error al obtener publicaciones:", error);
        res.status(500).json({ error: "❌ Error interno del servidor." });
    }
});

// 📌 Ruta para registrar una nueva publicación
router.post('/', async (req, res) => {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
        return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios." });
    }

    try {
        await db.promise().query(
            'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
            [title, content, author_id]
        );
        res.status(201).json({ message: "✅ Publicación creada exitosamente." });
    } catch (error) {
        console.error("❌ Error al registrar publicación:", error);
        res.status(500).json({ error: "❌ Error interno del servidor." });
    }
});

module.exports = router;
