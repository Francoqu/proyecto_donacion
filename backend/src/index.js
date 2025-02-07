const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Importar la conexión a MySQL

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Donaciones funcionando 🚀' });
});

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


const donationRoutes = require('./routes/donationRoutes');


const campaignRoutes = require('./routes/campaignRoutes');
app.use('/api', campaignRoutes);


app.use('/api', donationRoutes);
