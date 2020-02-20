const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use('/static', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

consign()
    .then('src/controllers')
    .then('src/models')
    .then('src/services')
    .then('src/middlewares')
    .then('src/config')
    .then('src/utils')
    .include('./src/routes')
    .into(app)

module.exports = app;