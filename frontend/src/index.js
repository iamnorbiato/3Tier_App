// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação atualizada para React 18+
import './index.css'; // Se você tiver um arquivo CSS principal
import App from './App'; // Importa seu componente principal App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);