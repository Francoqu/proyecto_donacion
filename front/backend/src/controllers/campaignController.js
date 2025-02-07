const Campaign = require('../models/campaignModel');

const getAllCampaigns = (req, res) => {
    Campaign.getCampaigns((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las campañas' });
        }
        res.status(200).json(results);
    });
};

module.exports = { getAllCampaigns };
