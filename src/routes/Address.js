const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/address'),
    Address = require('../controllers/Address');

route.get('/addresss', middleware.index, Address.index)
route.get('/address/:_id', middleware.show, Address.show)
route.post('/address', middleware.store, Address.store)
route.put('/address/:_id', middleware.update, Address.update)
route.delete('/address/:_id', middleware.destroy, Address.destroy)

module.exports = route;