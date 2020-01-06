const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log('Mongoose se conectou som sucesso!')).catch(e=>console.error(e))
  
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
 
consign()
    .then('src/controllers')
    .then('src/models') 
    .then('src/services')
    .then('src/middlewares')
    .include('./src/routes')
    .into(app)

module.exports = app;