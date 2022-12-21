require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// eslint-disable-next-line
const port = process.env.APP_PORT ?? 5001;

const database = require('../db');

const welcome = (req, res) => {
  res.send('Welcome to music');
};
app.get('/', welcome);

app.get('/api/tracks', (req, res) => {
  database
    .query('select * from track')
    .then(([tracks]) => {
      res.send(tracks);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
});
app.get('/api/albums', (req, res) => {
  database
    .query('select * from album')
    .then(([albums]) => {
      res.status(200).json(albums);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
});

app.get('/api/tracks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from track where id = ?', [id])
    .then(([tracks]) => {
      if (tracks[0] != null) {
        res.send(tracks[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
});

app.get('/api/albums/:id', (req, res) => {
  let { id } = req.params;
  database
    .query('select * from album where id = ?', [id])
    .then(([albums]) => {
      if (albums[0] != null) {
        res.json(albums[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
});

app.post('/api/tracks', (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  database
    .query(
      'INSERT INTO track ( title, youtube_url, id_album) VALUES ( ?, ?, ?)',
      [title, youtube_url, id_album]
    )
    .then(([track]) => {
      const createdPost = { id: track.insertId, title, youtube_url, id_album };
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error saving the track');
    });
});

app.post('/api/albums', (req, res) => {
  const { title, genre, picture, artist } = req.body;
  database
    .query(
      'INSERT INTO album ( title, genre, picture, artist) VALUES (?, ?, ?, ?)',
      [title, genre, picture, artist]
    )
    .then(([album]) => {
      const createdPost = { id: album.insertId, title, genre, picture, artist };
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/api/tracks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  database
    .query('UPDATE track SET  title = ? WHERE id = ?', [title, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
});
app.put('/api/albums/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  database
    .query('UPDATE album SET  title = ? WHERE id = ?', [title, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error updating the movie');
    });
});
app.delete('/api/tracks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('DELETE FROM track WHERE id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error deleting movie');
    });
});
app.delete('/api/albums/:id', (req, res) => {
  let { id } = req.params;
  database
    .query('DELETE FROM album WHERE id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error deleting movie');
    });
});
app.get('/api/albums/:id/tracks', (req, res) => {
  let { id } = req.params;
  database
    .query('SELECT * FROM track WHERE id_album = ?', [id])
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
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send('Error retrieving album from db');
    });
});

module.exports = app;
