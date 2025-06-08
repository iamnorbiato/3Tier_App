// backend/src/f1teams.js

const fs = require('fs');
const path = require('path');
const { pool } = require('./db'); // <--- Importa o 'pool'

async function getF1Teams(teamName, licensedIn) {
  let client; // Declarar 'client' para poder liberar no 'finally'
  try {
    client = await pool.connect(); // <--- Obtém um cliente do pool

    const queryPath = path.join(__dirname, '..', 'sql', 'f1teams.sql');
    const query = fs.readFileSync(queryPath, 'utf8');

    const params = [
      teamName ? `%${teamName}%` : null,
      licensedIn ? `%${licensedIn}%` : null
    ];

    const res = await client.query(query, params); // <--- Usa o cliente do pool
    console.log('Resultado da query (do f1teams.js):', res.rows);

    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar equipes de F1 na função f1teams.js:', error);
    throw error;
  } finally {
    if (client) {
      client.release(); // <--- Libera o cliente de volta ao pool (CRUCIAL!)
    }
  }
}

module.exports = {
  getF1Teams
};