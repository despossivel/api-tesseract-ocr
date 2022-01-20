require('dotenv').config({
    path: process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})
 

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const app = express();



const Index = require('./routes/index'),
    // Public = require('./routes/Public'),
    Uploads = require('./routes/Uploads');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
app.use('/static', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use([
    Index,
    Uploads
]);

 
// pegar rotas indefinidas e responder com 404
app.use((req, res, next) => res.status(404).send("Desculpe, não consigo encontrar isso!"));

// detectar erros do servidor e responder com 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo quebrou!')
})

module.exports = app;