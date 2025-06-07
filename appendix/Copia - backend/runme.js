// runme.js

const fs = require('fs');
const path = require('path');
const { db_connect } = require('./db');

(async () => {
  try {
    // Estabelece a conexão com o banco
    const client = await db_connect();

    // Lê o conteúdo da query
    const queryPath = path.join(__dirname, 'query.sql');
    const query = fs.readFileSync(queryPath, 'utf8');

    // Executa a query
    const res = await client.query(query);
    console.log('Resultado da query:', res.rows);

    // Encerra a conexão
    await client.end();
  } catch (err) {
    console.error('Erro ao executar a query:', err);
  }
})();