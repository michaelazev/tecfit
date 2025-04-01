// controllers/authController.js
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'SEU_SEGREDO_JWT'; // Substitua por uma chave secreta forte

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect();
    const checkUserResult = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE Username = @username');

    if (checkUserResult.recordset.length > 0) {
      return res.status(409).json({ message: 'Nome de usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO Users (Username, Password) VALUES (@username, @password); SELECT SCOPE_IDENTITY() AS UserID;');

    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.recordset[0].UserID });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  } finally {
    sql.close();
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE Username = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userId: user.UserID }, jwtSecret, { expiresIn: '1h' }); // Expira em 1 hora

    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  } finally {
    sql.close();
  }
};