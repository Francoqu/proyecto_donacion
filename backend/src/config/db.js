const mysql = require('mysql2');

// 📌 Configurar conexión usando variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'made',
    database: process.env.DB_NAME || 'donaciones',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10
});

// 📌 Verificar conexión inicial
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error al conectar a MySQL:", err.message);
    } else {
        console.log("✅ Conexión a MySQL establecida correctamente.");
        connection.release(); // Liberar conexión
    }
});

module.exports = pool;
