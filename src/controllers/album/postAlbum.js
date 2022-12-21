const connection = require('../../../database');

module.exports = (req, res) => {
  const { title, genre, picture, artist } = req.body;
  const sqlQuery = `INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?)`;
  connection
    .promise()
    .query(sqlQuery, [title, genre, picture, artist])
    .then(([result]) => {
      res.location(`/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user');
    });
};
