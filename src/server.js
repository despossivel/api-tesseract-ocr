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
    CartaoFidelidade,
    Estabelecimento,
    MetodosDePagamento,
    Payments,
    Recompesa,
    Uploads,
    Usuario
]);



// pegar rotas indefinidas e responder com 404
app.use(function (req, res, next) {
    res.status(404).send("Desculpe, não consigo encontrar isso!")
});

// detectar erros do servidor e responder com 500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Algo quebrou!')
})




module.exports = app;