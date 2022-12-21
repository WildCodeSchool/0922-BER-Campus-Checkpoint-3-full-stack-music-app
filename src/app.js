require('dotenv').config();
const express = require('express');

const { server_port } = process.env;
const app = express();

app.listen(server_port, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log('listen to port', server_port);
  }
});

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
