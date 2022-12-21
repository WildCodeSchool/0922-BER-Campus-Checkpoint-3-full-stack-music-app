const Router = require('express').Router();

const {
  getAllTracks,
  getTrackById,
  postTrack,
  updateTrack,
  deleteTrack,
} = require('../controllers/track');

Router.get('/', getAllTracks);
Router.get('/:id', getTrackById);
Router.delete('/:id', deleteTrack);
Router.put('/:id', updateTrack);
Router.post('/', postTrack);

module.exports = Router;
