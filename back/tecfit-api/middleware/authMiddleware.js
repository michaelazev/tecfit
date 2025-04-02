// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'd7e05170de09b548be953c08f46296af5ada161b7fdaca8ad3c9d25732f4c720'; // Deve ser a mesma chave do authController

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Não autorizado
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Proibido (token inválido)
    }
    req.userId = user.userId;
    next();
  });
};

module.exports = authenticateToken;