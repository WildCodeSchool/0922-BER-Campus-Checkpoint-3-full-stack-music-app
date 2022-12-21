require('dotenv').config();
const express = require('express');
const database = require('./db');


const app = express();

app.use(express.json());

database
  .promise()
  .query('use mydb;')
  .catch((e) => console.error(e));

app.get('/', (req, res) => {
  res.send('welcome to main route');
});

app.get('/api/tracks', (req, res) => {
  const sqlQuery = 'select * from track';
  database
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.send(result));
});

app.get('/api/tracks/:id', (req, res) => {
  let { id } = req.params;
  database
    .promise()
    .query('SELECT * FROM track WHERE id = ?', [id])
    .then(([results]) => {
      if (!results.length) {
        res.status(404).send({
          status: '404',
          msg: 'Not found',
          data: null,
        });
      } else {
        res.json(results[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving track from db');
    });
});

app.post('/api/tracks', (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  database
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
  database
    .promise()
    .query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/tracks/:id', (req, res) => {
  database
    .promise()
    .query('DELETE FROM track WHERE id = ?', [req.params.id])
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
  database
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.status(200).json(result));
});

app.get('/api/albums/:id', (req, res) => {
  let { id } = req.params;
  database
    .promise()
    .query('SELECT * FROM album WHERE id = ?', [id])
    .then(([results]) => {
      if (!results.length) {
        res.status(404).send({
          status: '404',
          msg: 'Not found',
          data: null,
        });
      } else {
        res.json(results[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving album from db');
    });
});

app.post('/api/albums', (req, res) => {
  const { title, genre, picture, artist } = req.body;
  database
    .promise()
    .query('INSERT INTO album (title,genre,picture,artist) VALUES (?,?,?,?)', [
      title,
      genre,
      picture,
      artist,
    ])
    .then(([result]) => {
      const createdPost = {
        id: result.insertId,
        title,
        genre,
        picture,
        artist,
      };
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/api/albums/:id', (req, res) => {
  database
    .promise()
    .query('UPDATE album SET ? WHERE id = ?', [req.body, req.params.id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/albums/:id', (req, res) => {
  database
    .promise()
    .query('DELETE FROM album WHERE id = ?', [req.params.id])
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
  database
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