const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/usuario'),
    Usuario = require('../controllers/Usuario');

route.get('/usuarios', middleware.index, Usuario.index)
route.get('/usuario/:_id', middleware.show, Usuario.show)

route.post('/usuario/cpf', middleware.storeCpf, Usuario.store)
route.post('/usuario/cnpj', middleware.storeCnpj, Usuario.store)

route.put('/usuario/:_id', middleware.update, Usuario.update)
route.delete('/usuario/:_id', middleware.destroy, Usuario.destroy)

module.exports = route;
