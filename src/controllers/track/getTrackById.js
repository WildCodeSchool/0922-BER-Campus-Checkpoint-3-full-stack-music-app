const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const sqlQuery = `select * from track where id = ?`;
  connection
    .promise()
    .query(sqlQuery, [id])
    .then(([result]) => {
      if (result[0] != null) {
        res.status(200).json(result[0]);
      } else {
        res.sendStatus(404);
      }
    });
};
