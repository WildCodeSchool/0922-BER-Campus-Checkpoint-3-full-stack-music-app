const connection = require('../../../database');

module.exports = (req, res) => {
  const { title, youtube_url } = req.body;
  const sqlQuery = `INSERT INTO track (title, youtube_url) VALUES (?, ?)`;
  connection
    .promise()
    .query(sqlQuery, [title, youtube_url])
    .then(([result]) => {
      res.location(`/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user');
    });
};
