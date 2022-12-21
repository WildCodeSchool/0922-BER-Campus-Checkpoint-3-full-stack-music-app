require('dotenv').config();
const express = require('express');
const connection = require("./db")

const { server_port } = process.env;

const app = express();

// Please keep this module.exports app, we need it for the tests !
module.exports = app;
