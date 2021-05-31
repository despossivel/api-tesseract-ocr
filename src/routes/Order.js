const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/order'),
    Order = require('../controllers/Order');

route.get('/orders', middleware.index, Order.index)
route.get('/order/:_id', middleware.show, Order.show)
route.post('/order', middleware.store, Order.store)
route.put('/order/:_id', middleware.update, Order.update)
route.delete('/order/:_id', middleware.destroy, Order.destroy)

module.exports = route;