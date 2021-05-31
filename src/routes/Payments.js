const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/payment'),
    Payments = require('../controllers/Payments');

route.get('/payments', middleware.index, Payments.index);
route.get('/payment/:_id', middleware.show, Payments.show);
route.post('/payment', middleware.store, Payments.store);

module.exports = route;