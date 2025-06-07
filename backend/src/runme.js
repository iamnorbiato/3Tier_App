// backend/src/runme.js

const fs = require('fs');
const path = require('path');
const { db_connect } = require('./db'); // Certifique-se de que db_connect está correto aqui

async function executeSqlAndFetchData() {
    let client; // Declare client fora do try para que possa ser acessado no finally
    try {
        // Estabelece a conexão com o banco
        client = await db_connect(); // Assume que db_connect retorna um client do pool

        // Lê o conteúdo da query
        const queryPath = path.join(__dirname, 'query.sql');
        const query = fs.readFileSync(queryPath, 'utf8');

        // Executa a query
        const res = await client.query(query);
        console.log('Resultado da query (do runme.js via API):', res.rows); // Log para depuração

        // Retorna os resultados. NÃO encerra a conexão aqui se você estiver usando um pool
        // Se db_connect() retorna um client do pool, o pool gerencia a conexão.
        // Se db_connect() cria um novo client para cada chamada, então client.release() ou client.end() seria necessário,
        // mas usar um pool é mais eficiente para APIs.
        return res.rows;
    } catch (err) {
        console.error('Erro ao executar a query via API:', err);
        throw err; // Re-lança o erro para ser capturado pela rota do Express
    } finally {
        // Se db_connect() retorna um client do pool, certifique-se de liberá-lo de volta ao pool
        if (client) {
            // Se db_connect() usa pool.connect(), então use client.release()
            // Se db_connect() retorna um client singleton (pool global), não precisa de release/end aqui
            // Verifique seu db.js para confirmar como a conexão é gerenciada
            if (typeof client.release === 'function') { // Verifica se é um client do pool
                client.release();
            } else if (typeof client.end === 'function') { // Para clientes que precisam ser encerrados
                // client.end(); // Geralmente não é recomendado para cada requisição em uma API
            }
        }
    }
}

// Exporta a função para ser usada por app.js
module.exports = {
    executeSqlAndFetchData
};