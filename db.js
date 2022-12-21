require('dotenv').config();
const mysql = require('mysql2');

const { db_host, db_port, db_user, db_password } = process.env;

const connection = mysql.createConnection({
  host: db_host,
  port: db_port,
  user: db_user,
  password: db_password,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('db connected');
});

module.exports = connection;
