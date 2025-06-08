// backend/src/f1drivers.js

const fs = require('fs');
const path = require('path');
const { pool } = require('./db'); // <--- Importa o 'pool'

async function getF1Drivers(drivername, nacionality) {
 
  let client; // Declarar 'client' para poder liberar no 'finally'
  try {
    client = await pool.connect(); // <--- Obtém um cliente do pool

    const queryPath = path.join(__dirname, '..', 'sql', 'f1drivers.sql');
    const query = fs.readFileSync(queryPath, 'utf8');

    const params = [
      drivername ? `%${drivername}%` : null,
      nacionality ? `%${nacionality}%` : null
    ];
  
    const res = await client.query(query, params); // <--- Usa o cliente do pool
    console.log('Resultado da query (do f1drivers.js):', res.rows);

    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar Pilotos de F1 na função f1Drivers.js:', error);
    throw error;
  } finally {
    if (client) {
      client.release(); // <--- Libera o cliente de volta ao pool (CRUCIAL!)
    }
  }
}

module.exports = {
  getF1Drivers
};