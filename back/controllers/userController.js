const express = require('express');
const mysql = require('mysql2/promise'); // Use a versão com suporte a Promises

const router = express.Router();

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'tecfitdb.mysql.database.azure.com',
  user: process.env.DB_USER || 'tecfit',
  password: process.env.DB_PASSWORD || 'Projetos2025',
  database: process.env.DB_NAME || 'tec_fit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Rota para obter todos os itens (contas)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

// Rota para obter um item por ID
router.get('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE UserId = ?', [itemId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar item:', err);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

// Rota para criar um novo item (a criar)
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (Username, Email) VALUES (?, ?)',
      [name, description]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso!', itemId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar item:', err);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

// Rota para atualizar um item (a criar)
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE users SET Username = ?, Description = ?, UpdatedAt = NOW() WHERE UserId = ?',
      [name, description, itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar item:', err);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

// Rota para deletar um item (a criar)
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE UserId = ?', [itemId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar item:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;