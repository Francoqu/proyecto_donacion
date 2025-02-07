const API_URL = 'http://localhost:5000/api';

export const donate = async (nombre, monto) => {
    try {
        const response = await fetch(`${API_URL}/donar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, monto }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al donar:', error);
    }
};

export const getDonations = async () => {
    try {
        const response = await fetch(`${API_URL}/donaciones`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener donaciones:', error);
    }
};

// 🔹 Agregar la función que faltaba 🔹
export const getCampaigns = async () => {
    try {
        const response = await fetch(`${API_URL}/campañas`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener campañas:', error);
    }
};
