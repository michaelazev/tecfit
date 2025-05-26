const express = require('express');
const mysql = require('mysql2/promise');
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

// Rota para obter todas as academias
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gym');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar academias:', err);
    res.status(500).json({ message: 'Erro ao buscar dados das academias.' });
  }
});

// Rota para obter uma academia por ID
router.get('/:id', async (req, res) => {
  const gymId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM gym WHERE gym_id = ?', [gymId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Academia não encontrada.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar academia:', err);
    res.status(500).json({ message: 'Erro ao buscar academia.' });
  }
});

// Rota para criar uma nova academia
router.post('/', async (req, res) => {
  const { name, address, open_time, email_address, phone, user_responsible } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO gym (name, address, open_time, email_address, phone, user_responsible) VALUES (?, ?, ?, ?, ?, ?)',
      [name, address, open_time, email_address, phone, user_responsible]
    );
    res.status(201).json({ message: 'Academia criada com sucesso!', gymId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar academia:', err);
    res.status(500).json({ message: 'Erro ao criar academia.' });
  }
});

// Rota para atualizar uma academia
router.put('/:id', async (req, res) => {
  const gymId = req.params.id;
  const { name, address, open_time, email_address, phone, user_responsible } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE gym SET name = ?, address = ?, open_time = ?, email_address = ?, phone = ?, user_responsible = ? WHERE gym_id = ?',
      [name, address, open_time, email_address, phone, user_responsible, gymId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Academia não encontrada.' });
    }
    res.json({ message: 'Academia atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar academia:', err);
    res.status(500).json({ message: 'Erro ao atualizar academia.' });
  }
});

// Rota para deletar uma academia
router.delete('/:id', async (req, res) => {
  const gymId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM gym WHERE gym_id = ?', [gymId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Academia não encontrada.' });
    }
    res.json({ message: 'Academia deletada com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar academia:', err);
    res.status(500).json({ message: 'Erro ao deletar academia.' });
  }
});

module.exports = router;