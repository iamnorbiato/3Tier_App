// backend/src/runme.js

const fs = require('fs');
const path = require('path');
const { pool } = require('./db'); // <--- Importa o 'pool'

async function executeSqlAndFetchData() {
    let client; // Declarar 'client' para poder liberar no 'finally'
    try {
        client = await pool.connect(); // <--- Obtém um cliente do pool

        const queryPath = path.join(__dirname, '..', 'sql', 'query.sql');
        const query = fs.readFileSync(queryPath, 'utf8');

        const res = await client.query(query); // <--- Usa o cliente do pool
        console.log('Resultado da query (do runme.js via API):', res.rows);

        return res.rows;
    } catch (err) {
        console.error('Erro ao executar a query via API (runme.js):', err);
        throw err;
    } finally {
        if (client) {
            client.release(); // <--- Libera o cliente de volta ao pool (CRUCIAL!)
        }
    }
}

module.exports = {
    executeSqlAndFetchData
};