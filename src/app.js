const express = require('express');
const connection = require('./db');
const serverPort = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});

app.listen(serverPort);

module.exports = app;

// TRACK

app.get('/api/tracks', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM track')
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving track from db.');
    });
});

app.get('/api/tracks/:id', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM track WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

app.post('/api/tracks', (req, res) => {
  const { title, youtube_url, album_id } = req.body;
  connection
    .promise()
    .query(
      'INSERT INTO track (title, youtube_url, album_id) VALUES (?, ?, ?)',
      [title, youtube_url, album_id]
    )
    .then(([result]) => {
      const createdTrack = {
        id: result.insertId,
        title,
        youtube_url,
        album_id,
      };
      res.status(201).json(createdTrack);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/tracks/:id', (req, res) => {
  connection
    .promise()
    .query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.id])
    .then(([result]) => {
      res.sendStatus(204).send('No Content');
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/tracks/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM track WHERE id = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204).send('No Content');
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// ALBUM

app.get('/api/albums', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM album')
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving album from db.');
    });
});

app.get('/api/albums/:id', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM album WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

app.get('/api/albums/:id/tracks', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM album')
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    });
});

app.post('/api/albums', (req, res) => {
  const { title, genre, picture, artist } = req.body;
  connection
    .promise()
    .query(
      'INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
      [title, genre, picture, artist]
    )
    .then(([result]) => {
      const createdTrack = {
        id: result.insertId,
        title,
        genre,
        picture,
        artist,
      };
      res.status(201).json(createdTrack);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/albums/:id', (req, res) => {
  connection
    .promise()
    .query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.id])
    .then(([result]) => {
      res.sendStatus(204).send('No Content');
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/albums/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM album WHERE id = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204).send('No Content');
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
