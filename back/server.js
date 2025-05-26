require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
const dbConfig = require('./config/db.config');
const jwtSecret = process.env.JWT_SECRET;
const authRoutes = require('./controllers/authController');
const userDataRoutes = require('./controllers/userController');
const gymDataRoutes = require('./controllers/gymController');
const authenticateToken = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 8080;

// Configuração do CORS
app.use(cors({
  origin: ['https://tecfit-nu.vercel.app', 'http://localhost:3000'], // Permite requisições do frontend e do localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
}));

// Middleware para analisar JSON  
app.use(express.json());

// Conectar ao banco de dados
async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('✅ Conectado ao banco de dados SQL Server');
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  }
}

connectToDatabase();

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de dados (protegidas por autenticação)
app.use('/api/data/users', authenticateToken, userDataRoutes);
app.use('/api/data/gym', authenticateToken, gymDataRoutes);
app.use('/user', authenticateToken, userDataRoutes);
app.use('/favorite', authenticateToken);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
