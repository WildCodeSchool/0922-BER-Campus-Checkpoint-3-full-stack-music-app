const mysql = require('mysql2');

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.connect(function(err){
  if (err) console.log(err);
  console.log("db connected")
})

module.exports = database;