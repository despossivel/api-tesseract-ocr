'use strinct';
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

const app = express();


mongoose.connect('mongodb+srv://dev:qazx123.@cluster0-ep251.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).catch(error => handleError(error));;


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cors());


consign().include('./src/routes')
    .then('src/controllers')
    .then('src/models') 
    .into(app)

   // console.log(app)

module.exports = app;