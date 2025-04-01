// config/db.config.js
module.exports = {
    server: 'SEU_SERVIDOR_SQL_SERVER', // Ex: localhost\SQLEXPRESS
    database: 'tec_fit',
    user: 'SEU_USUARIO_SQL_SERVER',
    password: 'SUA_SENHA_SQL_SERVER',
    options: {
      encrypt: true, // Para conexões seguras (pode depender da sua configuração)
      trustServerCertificate: true // Em ambientes de desenvolvimento, pode ser necessário
    }
  };