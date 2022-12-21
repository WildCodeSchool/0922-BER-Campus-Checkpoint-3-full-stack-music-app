const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const sqlQuery = `delete from album where id = ?`;
  connection
    .promise()
    .query(sqlQuery, [id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting data from database');
    });
};
