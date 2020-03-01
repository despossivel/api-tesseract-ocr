require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

require('./config/connection');


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



const Index = require('./routes/index');
const Public = require('./routes/Public');
const Auth = require('./routes/auth');
const CartaoFidelidade = require('./routes/CartaoFidelidade');
const Estabelecimento = require('./routes/Estabelecimento');
const MetodosDePagamento = require('./routes/MetodosDePagamento');
const Payments = require('./routes/Payments');
const Recompesa = require('./routes/Recompensa');
const Uploads = require('./routes/Uploads');
const Usuario = require('./routes/Usuario');

app.use([Index, 
    Public, 
    Auth, CartaoFidelidade,
    Estabelecimento, MetodosDePagamento,    
    Payments, Recompesa, Uploads, Usuario]);





/*
consign()
    .then('src/controllers')
    .then('src/models')
    .then('src/services')
    .then('src/middlewares')
    .then('src/config')
    .then('src/utils')
    .include('./src/routes')
    .into(app)
*/


module.exports = app;