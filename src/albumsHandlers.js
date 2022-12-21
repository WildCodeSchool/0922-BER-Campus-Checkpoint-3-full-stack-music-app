const connection = require('../db');

const getAlbums = (req, res) => {
  connection
    .promise()
    .query('select * from albums')
    .then(([albums]) => {
      if (albums[0] != null) {
        res.json(albums);
        res.status(200);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getAlbumById = (req, res) => {
  connection
    .promise()
    .query('select * from albums')
    .then(([albums]) => {
      const id_album = parseInt(req.params.id_album);

      const album = albums.find((album) => album.id_album === id_album);

      if (album != null) {
        res.json(album);
      } else {
        res.status(404).send('Not Found');
      }
    });
};

const postAlbum = (req, res) => {
  const { title, genre, picture, artist } = req.body;

  connection
    .promise()
    .query(
      'INSERT INTO albums (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
      [title, genre, picture, artist]
    )
    .then(([result]) => {
      res.location(`/api/tracks/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the album');
    });
};
const updateAlbum = (req, res) => {
  const id_album = parseInt(req.params.id_album);
  const { title } = req.body;

  connection
    .promise()
    .query('UPDATE albums SET title = ? WHERE id_album = ?', [title, id_album])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing the album');
    });
};

const deleteAlbum = (req, res) => {
  const id_album = parseInt(req.params.id_album);
  connection
    .promise()
    .query('DELETE FROM albums WHERE id_album = ?', [id_album])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting the album');
    });
};

module.exports = {
  postAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};
