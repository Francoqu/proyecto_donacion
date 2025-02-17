const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tu usuario de MySQL es diferente
  password: 'root', // Asegúrate de poner la contraseña de MySQL si es necesario
  database: 'donaciones' // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = db;
