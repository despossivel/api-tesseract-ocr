'use strinct';
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

const app = express();


mongoose.connect('mongodb+srv://dev:dev@cluster0-pasu1.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cors());


consign().include('./src/routes')
    .then('./src/controllers')
    .then('./src/models')
    .then('./src/services')
    .into(app)

module.exports = app;