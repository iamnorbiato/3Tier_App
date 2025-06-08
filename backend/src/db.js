// backend/src/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('Cliente conectado ao banco de dados pelo pool (via db.js)');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool de banco de dados (db.js)', err);
  process.exit(-1);
});

module.exports = {
  pool // Exporta a instância do pool diretamente
};