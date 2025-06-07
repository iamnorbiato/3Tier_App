import React, { useEffect, useState } from 'react';
import './index.css'; // Ou seu arquivo CSS

function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A URL aqui PRECISA começar com /api para que o Nginx a proxye
    fetch('/api/minha-pagina-inicial-dados')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar dados da API:", error);
        setError(error);
        setLoading(false);
      });
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez ao montar o componente

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Aplicação React com Docker!</h1>
        <p>{apiData.message}</p>
        <p>Dado do Backend (cnum): {apiData.dataFromApi}</p>
        <p>Timestamp: {apiData.timestamp}</p>
        {/* Aqui você pode renderizar outros componentes ou dados */}
      </header>
    </div>
  );
}

export default App;