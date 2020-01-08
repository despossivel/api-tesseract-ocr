const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
 
consign()
    .then('src/controllers')
    .then('src/models') 
    .then('src/services')
    .then('src/middlewares')
    .then('src/config')
    .include('./src/routes')
    .into(app)

module.exports = app;