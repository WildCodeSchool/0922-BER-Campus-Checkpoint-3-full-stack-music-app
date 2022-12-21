const express = require('express');
const connection = require('../database');
const { albumRoute, trackRoute } = require('./routes');

connection
  .promise()
  .query('use albums;')
  .catch((e) => console.error(e));

const app = express();
app.use(express.json());

app.use('/api/albums', albumRoute);
app.use('/api/tracks', trackRoute);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
