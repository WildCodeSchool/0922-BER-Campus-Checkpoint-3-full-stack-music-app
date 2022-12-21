const fs = require("fs");
const connection = require("./db");
const migrate = async () => {
  const sql = fs.readFileSync("./schema.sql", "utf8");
  await connection.promise().query(sql);
  connection.end();
};

try {
  migrate();
  console.log("successfully migrated");
} catch (err) {
  console.log(err);
}