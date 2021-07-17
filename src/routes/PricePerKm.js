const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/pricePerKm'),
    PricePerKm = require('../controllers/PricePerKm');

route.get('/price/per/km', middleware.index, PricePerKm.index)
route.get('/price/per/km/:_id', middleware.show, PricePerKm.show)
route.post('/price/per/km', middleware.store, PricePerKm.store)
route.put('/price/per/km/:_id', middleware.update, PricePerKm.update)
route.delete('/price/per/km/:_id', middleware.destroy, PricePerKm.destroy)

module.exports = route;