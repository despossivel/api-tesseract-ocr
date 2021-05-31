const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/public'),
    Public = require('../controllers/Public');

route.get('/public/confirmar/conta/:_id', middleware.update, Public.update)
route.get('/public/esqueci/minha/senha/:email', middleware.show, Public.show)

module.exports = route;