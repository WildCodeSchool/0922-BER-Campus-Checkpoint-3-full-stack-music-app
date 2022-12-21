const express = require('express');
const connection = require('../database');
const { albumRoute } = require('./routes');

connection
  .promise()
  .query('use albums;')
  .catch((e) => console.error(e));

const app = express();
app.use(express.json());

app.use('/api/album', albumRoute);
// app.use('/api/track', trackRoute);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
