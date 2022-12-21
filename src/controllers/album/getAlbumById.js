const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const sqlQuery = `select * from album where id = ?`;
  connection
    .promise()
    .query(sqlQuery, [id])
    .then(([result]) => res.status(200).json(result[0]));
};
