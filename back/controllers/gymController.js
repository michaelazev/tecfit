const express = require('express');
const mysql = require('mysql2/promise'); // Use a versão com suporte a Promises
const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'tecfitdb.mysql.database.azure.com',
  user: process.env.DB_USER || 'tecfit',
  password: process.env.DB_PASSWORD || 'Projetos2025',
  database: process.env.DB_NAME || 'tec_fit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Rota para obter todos os itens (academias)
router.get('/', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM gym');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).json({ message: 'Erro ao buscar dados de academia.' });
    }
});
// Rota para obter um item por ID (academias)
router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM gym WHERE GymId = ?', [itemId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Academia não encontrado.' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).json({ message: 'Erro ao buscar item.' });
    }
});