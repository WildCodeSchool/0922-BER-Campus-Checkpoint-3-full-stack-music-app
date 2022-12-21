require('dotenv').config();
const express = require('express');
const connection = require('../db');

const app = express();

app.use(express.json());

connection
  .promise()
  .query('use CP3;')
  .catch((e) => console.error(e));

app.get('/', (req, res) => {
  res.send('welcome to main route');
});

app.get('/api/tracks', (req, res) => {
  const sqlQuery = 'select * from track';
  connection
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.send(result));
});

app.get('/api/tracks/:id', (req, res) => {
  let { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM track WHERE id_track = ?', [id])
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
      console.error(err);
      res.status(500).send('Error retrieving track from db');
    });
});

app.post('/api/tracks', (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  connection
    .promise()
    .query('INSERT INTO track (title,youtube_url,id_album) VALUES (?,?,?)', [
      title,
      youtube_url,
      id_album,
    ])
    .then(([result]) => {
      const createdPost = { id: result.insertId, title, youtube_url, id_album };
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/api/tracks/:id', (req, res) => {
  connection
    .promise()
    .query('UPDATE track SET ? WHERE id_track = ?', [req.body, req.params.id])
    .then(([result]) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/tracks/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM track WHERE id_track = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
app.get('/api/albums', (req, res) => {
  const sqlQuery = 'select * from album';
  connection
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.send(result));
});

app.get('/api/albums/:id', (req, res) => {
  let { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM album WHERE id_album = ?', [id])
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
      console.error(err);
      res.status(500).send('Error retrieving album from db');
    });
});

app.post('/api/albums', (req, res) => {
  const { title, picture, artist } = req.body;
  connection
    .promise()
    .query('INSERT INTO album (title,picture,artist) VALUES (?,?,?)', [
      title,
      picture,
      artist,
    ])
    .then(([result]) => {
      const createdPost = { id: result.insertId, title, picture, artist };
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/api/albums/:id', (req, res) => {
  connection
    .promise()
    .query('UPDATE album SET ? WHERE id_album = ?', [req.body, req.params.id])
    .then(([result]) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/albums/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM album WHERE id_album = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/api/albums/:id/tracks', (req, res) => {
  let { id } = req.params;
  connection
    .promise()
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
      console.error(err);
      res.status(500).send('Error retrieving album from db');
    });
});

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
