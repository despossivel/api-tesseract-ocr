const { Router } = require('express');
const route = new Router();

const middleware = require('../middlewares/routes/public');
const Public = require('../controllers/Public');

route.get('/public/confirmar/conta/:_id', middleware.update, Public.update)
route.get('/public/esqueci/minha/senha/:email', middleware.show, Public.show)

module.exports = route;