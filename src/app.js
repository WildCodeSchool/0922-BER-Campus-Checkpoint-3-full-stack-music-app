require('dotenv').config();
const express = require('express');
const connection = require('../db');

connection
  .promise()
  .query('USE albums;')
  .catch((e) => console.error(e));

const app = express();
app.use(express.json());

const tracksHandlers = require('./tracksHandlers');
app.post('/api/tracks', tracksHandlers.postTrack);
app.get('/api/tracks', tracksHandlers.getTracks);
app.get('/api/tracks/:id_track', tracksHandlers.getTrackById);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
