const mysql = require('mysql2/promise');

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database
  .getConnection()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Can reach database');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

module.exports = database;
