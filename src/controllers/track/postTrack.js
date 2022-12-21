const connection = require('../../../database');

module.exports = (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  let item = { title, youtube_url, id_album };
  const sqlQuery = `INSERT INTO track (title, youtube_url, id_album) VALUES (?, ?, ?)`;
  connection
    .promise()
    .query(sqlQuery, [title, youtube_url, id_album])
    .then(([result]) => {
      item.id = result.insertId;
      res.location(`/${result.insertId}`).status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the track');
    });
};
