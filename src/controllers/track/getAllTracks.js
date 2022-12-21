const connection = require('../../../database');

module.exports = (req, res) => {
  const sqlQuery = 'select * from track;';
  connection
    .promise()
    .query(sqlQuery)
    .then(([result]) => res.status(200).send(result));
};
