// backend/src/app.js

const express = require('express');
const app = express();
const { executeSqlAndFetchData } = require('./runme');
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

// ... suas outras rotas do backend ...

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});