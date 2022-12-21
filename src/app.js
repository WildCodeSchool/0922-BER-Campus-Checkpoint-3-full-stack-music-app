require('dotenv').config();
const express = require('express');
const connection = require('../db');

const app = express();

connection
  .promise()
  .query('use CP3;')
  .catch((e) => console.error(e));

app.get('/', (req, res) => {
  res.send('welcome to main route');
});

app.get('/api/tracks', (req, res) => {
  const sqlQuery = 'select * from track';
  connection
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.send(result));
});

app.get('/api/tracks/:id', (req, res) => {
  let { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM track WHERE id_track = ?', [id])
    .then(([results]) => {
      if (!results.length) {
        res.status(404).send({
          status: '404',
          msg: 'Not found',
          data: null,
        });
      } else {
        res.json(results);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving track from db');
    });
});
// Please keep this module.exports app, we need it for the tests !
module.exports = app;
