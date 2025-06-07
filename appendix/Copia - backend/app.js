const express = require('express');
const fs = require('fs');
const path = require('path');
const { db_connect } = require('./db');

const app = express();

// Serve a pasta /images pela URL /images
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 5000;

// ======================================================
// ROTA ADICIONADA PARA O CAMINHO RAIZ (/)
// ======================================================
app.get('/', (req, res) => {
  res.status(200).send('<h1>Backend conectado e rodando!</h1><p>Acesse /runme para executar a query.</p>');
});
// ======================================================

// Rota que executa a query
app.get('/runme', async (req, res) => {
  try {
    const client = await db_connect();
    const queryPath = path.join(__dirname, 'query.sql');
    const query = fs.readFileSync(queryPath, 'utf8');
    const result = await client.query(query);
    await client.end();
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao executar /runme:', err.message, err.stack);
    res.status(500).send('Erro ao executar a query');
  }
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});