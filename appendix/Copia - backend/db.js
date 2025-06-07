const { Client } = require('pg');

const db_connect = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados com sucesso');
    return client;
  } catch (err) {
    console.error('Erro na conexão com o banco de dados:', err.stack);
    throw err;
  }
};

module.exports = { db_connect };
