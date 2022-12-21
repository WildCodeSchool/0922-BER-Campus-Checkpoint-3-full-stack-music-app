require('dotenv').config();
const express = require('express');
const connection = require('../db');

const app = express();

app.use(express.json());
