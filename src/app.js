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
app.put('/api/tracks/:id_track', tracksHandlers.updateTrack);
app.delete('/api/tracks/:id_track', tracksHandlers.deleteTrack);

const albumsHandlers = require('./albumsHandlers');
app.post('/api/albums', albumsHandlers.postAlbum);
app.get('/api/albums', albumsHandlers.getAlbums);
app.get('/api/albums/:id_album', albumsHandlers.getAlbumById);
app.put('/api/albums/:id_album', albumsHandlers.updateAlbum);
app.delete('/api/albums/:id_album', albumsHandlers.deleteAlbum);

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
