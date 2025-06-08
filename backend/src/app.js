// backend/src/app.js

const express = require('express');
const app = express();
const { executeSqlAndFetchData } = require('./runme');
const { getF1Teams } = require('./f1teams');
const port = process.env.PORT || 5000;

app.use(express.json());

// A rota no Express DEVE corresponder ao que o Nginx envia
// que é o caminho *sem* o prefixo /api
app.get('/runme-data', async (req, res) => { // <--- Rota /runme-data, não /api/runme-data
    try {
        const data = await executeSqlAndFetchData();
        res.json({
            message: 'Dados do runme.js obtidos com sucesso!',
            result: data
        });
    } catch (error) {
        console.error('Erro na rota /runme-data:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao processar runme.js', details: error.message });
    }
});

// Exemplo de uso: GET /f1teams?teamname=Ferrari&licensedin=Italy
app.get('/f1teams', async (req, res) => {
    // Pega os parâmetros 'teamname' e 'licensedin' da query string da URL
    const { teamname, licensedin } = req.query;

    try {
        // Chama a função getF1Teams (que está em f1teams.js) com os parâmetros
        const teams = await getF1Teams(teamname, licensedin);
        res.json({
            message: 'Equipes de F1 encontradas.',
            count: teams.length,
            data: teams
        });
    } catch (error) {
        console.error('Erro na rota /f1teams:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar equipes de F1.', details: error.message });
    }
});
// --- FIM DA NOVA ROTA ---

// ... suas outras rotas do backend ...

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});