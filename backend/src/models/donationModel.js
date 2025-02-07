const db = require('../config/db');

// Crear la tabla si no existe
const createTableQuery = `
CREATE TABLE IF NOT EXISTS donaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creando la tabla de donaciones:', err);
        return;
    }
    console.log('Tabla de donaciones verificada ✅');
});

// Función para insertar una donación
const addDonation = (nombre, monto, callback) => {
    const query = 'INSERT INTO donaciones (nombre, monto) VALUES (?, ?)';
    db.query(query, [nombre, monto], callback);
};

// Función para obtener todas las donaciones
const getDonations = (callback) => {
    const query = 'SELECT * FROM donaciones';
    db.query(query, callback);
};

module.exports = { addDonation, getDonations };
