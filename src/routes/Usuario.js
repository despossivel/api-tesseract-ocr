const { Router } = require('express');
const route = new Router();

const middleware = require('../middlewares/routes/usuario');
const Usuario = require('../controllers/Usuario');

route.get('/usuarios', middleware.index, Usuario.index)
route.get('/usuario/:_id', middleware.show, Usuario.show)
route.post('/usuario', middleware.store, Usuario.store)
route.put('/usuario/:_id', middleware.update, Usuario.update)
route.delete('/usuario/:_id', middleware.destroy, Usuario.destroy)

module.exports = route;
