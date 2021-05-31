//const { check, body } = require('express-validator');
const { Router } = require('express'),
    route = new Router();

route.get('/', (req, res) => res.render('index'))

module.exports = route;