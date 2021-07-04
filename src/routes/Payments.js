const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/payment'),
    Payments = require('../controllers/Payments');

route.get('/payments/:_gateway', middleware.index, Payments.index);
route.get('/payment/:_gateway/:_id', middleware.show, Payments.show);
route.post('/payment/:_gateway', middleware.store, Payments.store);

module.exports = route;