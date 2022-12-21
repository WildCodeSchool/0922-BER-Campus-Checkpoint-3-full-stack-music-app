const connection = require('../db');

const getTracks = (req, res) => {
  connection
    .promise()
    .query('select * from tracks')
    .then(([tracks]) => {
      if (tracks[0] != null) {
        res.json(tracks);
        res.status(202);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getTrackById = (req, res) => {
  connection
    .promise()
    .query('select * from tracks')
    .then(([tracks]) => {
      const id_track = parseInt(req.params.id_track);

      const track = tracks.find((track) => track.id_track === id_track);

      if (track != null) {
        res.json(track);
      } else {
        res.status(404).send('Not Found');
      }
    });
};

const postTrack = (req, res) => {
  const { title, youtube_url, id_album } = req.body;

  connection
    .promise()
    .query(
      'INSERT INTO tracks (title, youtube_url, id_album) VALUES (?, ?, ?)',
      [title, youtube_url, id_album]
    )
    .then(([result]) => {
      res.location(`/api/tracks/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the track');
    });
};

const updateTrack = (req, res) => {
  const id_track = parseInt(req.params.id_track);
  const { title } = req.body;

  connection
    .promise()
    .query('UPDATE tracks SET title = ? WHERE id_track = ?', [title, id_track])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing the track');
    });
};

const deleteTrack = (req, res) => {
  const id_track = parseInt(req.params.id_track);
  connection
    .promise()
    .query('DELETE FROM tracks WHERE id_track = ?', [id_track])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting the track');
    });
};

module.exports = {
  postTrack,
  getTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
};
