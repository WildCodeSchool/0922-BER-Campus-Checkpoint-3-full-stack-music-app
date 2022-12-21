require('dotenv').config();
const mysql = require('mysql2');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('db connected');
});

module.exports = connection;
