require('dotenv').config({
    path: process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

console.log(process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env')

require('./config/connection');

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const app = express();



const Index = require('./routes/index'),
    Public = require('./routes/Public'),
    Auth = require('./routes/auth'),
    Payments = require('./routes/Payments'),
    Order = require('./routes/Order'),
    Uploads = require('./routes/Uploads'),
    Usuario = require('./routes/Usuario'),
    Address = require('./routes/Address'),
    PricePerKm = require('./routes/PricePerKm');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
app.use('/static', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use([
    Index,
    Public,
    Auth,
    Payments,
    Order,
    Uploads,
    Usuario,
    Address,
    PricePerKm
]);

app.use('/docs-api', express.static(path.resolve(__dirname, '..', 'public', 'docs',)));

// pegar rotas indefinidas e responder com 404
app.use((req, res, next) => res.status(404).send("Desculpe, não consigo encontrar isso!"));

// detectar erros do servidor e responder com 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo quebrou!')
})

module.exports = app;