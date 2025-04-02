const express = require('express');
const mysql = require('mysql2/promise'); // Use o módulo de promessas do mysql2
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const jwtSecret = 'd7e05170de09b548be953c08f46296af5ada161b7fdaca8ad3c9d25732f4c720'; // Substitua por uma chave secreta forte

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'buwucrtiuuqvi3rpduen-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'uzzsbteksyu4pto3',
  password: process.env.DB_PASSWORD || '74TMgwDOmSyVTU8KdSAH',
  database: process.env.DB_NAME || 'buwucrtiuuqvi3rpduen',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Rota de registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const connection = await pool.getConnection();

    // Verifica se o usuário já existe
    const [rows] = await connection.execute('SELECT * FROM register WHERE Username = ?', [username]);
    if (rows.length > 0) {
      connection.release();
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }

    const [emailRows] = await connection.execute('SELECT * FROM register WHERE Email = ?', [email]);
    if (emailRows.lenght > 0){
      connection.release();
      return res.status(409).json({ message: 'Email já existe.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário
    const [result] = await connection.execute(
      'INSERT INTO register (Username, Email, Password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    connection.release();
    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.insertId });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();

    const [emailRows] = await connection.execute('SELECT * FROM register WHERE Email = ?', [email]);
    if (emailRows.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = emailRows[0];

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.UserID }, jwtSecret, { expiresIn: '1h' });

    connection.release();
    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;