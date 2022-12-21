const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const sqlQuery = `delete from track where id = ?`;
  connection
    .promise()
    .query(sqlQuery, [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting data from database');
    });
};
