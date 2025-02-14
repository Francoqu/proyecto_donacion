const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables de entorno

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'donaciones',
    port: process.env.DB_PORT || 3306
});

// Intentar conectar
connection.connect(err => {
    if (err) {
        console.error('❌ Error de conexión a MySQL:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos MySQL');
    }
});

module.exports = connection;
