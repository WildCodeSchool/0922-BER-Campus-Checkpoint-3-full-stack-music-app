const connection = require('../../../database');

module.exports = (req, res) => {
  const id = parseInt(req.params.id);
  const sqlQuery = `select * from album where id_album = ?`;
  connection
    .promise()
    .query(sqlQuery, [id])
    .then(([result]) => res.send(result));
};
