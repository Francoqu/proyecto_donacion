const db = require('../config/db');

// Obtener todas las campañas
const getCampaigns = (callback) => {
    db.query('SELECT * FROM campañas', callback);
};

module.exports = { getCampaigns };
