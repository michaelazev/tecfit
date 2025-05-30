const express = require('express');
const mysql = require('mysql2/promise'); // Use o módulo de promessas do mysql2
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();
const jwtSecret = 'd7e05170de09b548be953c08f46296af5ada161b7fdaca8ad3c9d25732f4c720';

// Configuração do pool de conexões (henrique)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'tecfitdb.mysql.database.azure.com',
  user: process.env.DB_USER || 'tecfit',
  password: process.env.DB_PASSWORD || 'Projetos2025',
  database: process.env.DB_NAME || 'tec_fit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Rota de registro (henrique)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const connection = await pool.getConnection();

    // Verifica se o usuário já existe (henrique, jamili, joaquim)
    const [rows] = await connection.execute('SELECT * FROM users WHERE Username = ?', [username]);
    if (rows.length > 0) {
      connection.release();
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }

    const [emailRows] = await connection.execute('SELECT * FROM users WHERE Email = ?', [email]);
    if (emailRows.length > 0) {
      connection.release();
      return res.status(409).json({ message: 'Email já existe.' });
    }

    // Criptografa a senha (Maria Luiza)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário com o userId (Maria Luiza)
    const [result] = await connection.execute(
      'INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    connection.release();
    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.insertId });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Rota de login (henrique)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const connection = await pool.getConnection();

      // Verifica se o email existe (henrique, jamili, joaquim)
      const [rows] = await connection.execute('SELECT * FROM users WHERE Email = ?', [email]);
      if (rows.length === 0) {
          connection.release();
          return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const user = rows[0];

      // Verifica a senha (henrique, jamili, joaquim)
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
          connection.release();
          return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      connection.release();

      // Gera o token JWT (henrique, jamili, joaquim)
      const token = jwt.sign(
          { userId: user.Id, username: user.Username, email: user.Email }, // Payload
          jwtSecret, // Chave secreta
          { expiresIn: '1h' } // Tempo de expiração
      );

      // Retorna o token e os dados do usuário (henrique)
      res.status(200).json({
          message: 'Login bem-sucedido!',
          token,
          user: {
              username: user.Username,
              email: user.Email
          }
      });
  } catch (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;