const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
const dbConfig = require('./config/db.config'); // Certifique-se de que esse arquivo existe
const authRoutes = require('./controllers/authController'); // Certifique-se de que esse arquivo existe
const dataRoutes = require('./controllers/dataController'); // Certifique-se de que esse arquivo existe
const app = express();
const port = process.env.PORT || 8080;

// Configuração do CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://tecfit-nu.vercel.app', 'http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Permite a origem
    } else {
      callback(new Error('Not allowed by CORS')); // Bloqueia a origem
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Cabeçalhos permitidos
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
app.use('/api/data', dataRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
