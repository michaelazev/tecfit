const mysql = require('mysql2');
require('dotenv').config({ path: './config/db.env' });

var databaseOptions = {
  host     : process.env.DB_HOST,
  database : process.env.DB_NAME,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : '3306'
};

module.exports = databaseOptions;