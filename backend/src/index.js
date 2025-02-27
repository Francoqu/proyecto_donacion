const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 📌 Cargar variables de entorno y verificar errores
const result = dotenv.config();
if (result.error) {
    console.error("⚠️ No se pudo cargar el archivo .env. Asegúrate de que existe.");
    process.exit(1);
}

const db = require('./config/db'); // Conexión a MySQL

const app = express();

// 📌 Middlewares
app.use(express.json());
app.use(cors());

// 📢 Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: '✅ API de Donaciones funcionando 🚀' });
});

// 📌 Importar rutas
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contentRoutes = require('./routes/contentRoutes');
const insigniaRoutes = require('./routes/insigniaRoutes');
const statsRoutes = require('./routes/statsRoutes');
const adminCampaignRoutes = require('./routes/adminCampaignRoutes');

// 📌 Configurar rutas en la API
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/insignias', insigniaRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin/campaigns', adminCampaignRoutes);

// 📌 Iniciar el servidor después de una conexión exitosa
const PORT = process.env.PORT || 5000;

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err);
        process.exit(1);
    } else {
        console.log("✅ Conectado a la base de datos MySQL");
        connection.release(); // Liberar conexión del pool

        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
            console.log(`🌍 API disponible en http://localhost:${PORT}/api`);
        });
    }
});
