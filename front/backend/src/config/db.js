const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'donaciones'
});

// Conectar a MySQL
connection.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL ✅');
});

module.exports = connection;
