// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'SEU_SEGREDO_JWT'; // Deve ser a mesma chave do authController

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