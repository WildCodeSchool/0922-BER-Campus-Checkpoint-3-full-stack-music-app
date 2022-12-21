const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const sqlQuery = `update track set title = ? where id_track = ?`;
  connection
    .promise()
    .query(sqlQuery, [title, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    });
};
