const { Client } = require('pg');

const db_connect = async () => {
  const client = new Client({
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD)
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