const Router = require('express').Router();

const {
  getAllAlbums,
  getAlbumById,
  postAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/album');

Router.get('/', getAllAlbums);
Router.get('/:id', getAlbumById);
Router.delete('/:id', deleteAlbum);
Router.put('/:id', updateAlbum);
Router.post('/', postAlbum);

module.exports = Router;
