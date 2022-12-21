const connection = require('../../../database');

module.exports = (req, res) => {
  const { title, genre, picture, artist } = req.body;
  let item = { title, genre, picture, artist };
  const sqlQuery = `INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?)`;
  connection
    .promise()
    .query(sqlQuery, [title, genre, picture, artist])
    .then(([result]) => {
      item.id = result.insertId;
      res.location(`/${result.insertId}`).status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the album');
    });
};
