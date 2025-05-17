// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'd7e05170de09b548be953c08f46296af5ada161b7fdaca8ad3c9d25732f4c720'; // Deve ser a mesma chave do authController

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }
  
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    req.userId = user.userId;
    next();
  });
};

module.exports = authenticateToken;