const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Conexión a MySQL

// Cargar variables de entorno
dotenv.config();

const app = express();

// 📌 Middlewares
app.use(express.json());
app.use(cors());

// 📢 Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Donaciones funcionando 🚀' });
});

// 📌 Importar rutas
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contentRoutes = require('./routes/contentRoutes');
const insigniaRoutes = require('./routes/insigniaRoutes');
const statsRoutes = require('./routes/statsRoutes'); // 📊 Nueva ruta para estadísticas
const adminCampaignRoutes = require('./routes/adminCampaignRoutes'); // 📢 Administración de campañas

// 📌 Configurar rutas en la API
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/insignias', insigniaRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin/campaigns', adminCampaignRoutes);

// 📌 Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🌍 API disponible en http://localhost:${PORT}/api`);
    console.log(`📊 Estadísticas en http://localhost:${PORT}/api/stats`);
    console.log(`📢 Administración de campañas en http://localhost:${PORT}/api/admin/campaigns`);
});
