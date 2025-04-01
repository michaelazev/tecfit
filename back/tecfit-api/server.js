// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const dbConfig = require('./config/db.config');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar o corpo da requisição como JSON
app.use(bodyParser.json());

// Conectar ao banco de dados
async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado ao banco de dados SQL Server');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

connectToDatabase();

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de dados (protegidas por autenticação)
app.use('/api/data', dataRoutes); // Você pode adicionar o middleware de autenticação aqui

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});