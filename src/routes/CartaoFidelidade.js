const { Router } = require('express')
const route = new Router();

const CartaoFidelidade = require('../controllers/CartaoFidelidade');
const middleware = require('../middlewares/routes/cartaoFidelidade');

route.get('/cartoes/fidelidade', middleware.index, CartaoFidelidade.index)
route.get('/cartao/fidelidade/:_id', middleware.show, CartaoFidelidade.show)
route.post('/cartao/fidelidade', middleware.store, CartaoFidelidade.store)

//route.put('/cartao/fidelidade/:_id', middleware.update, CartaoFidelidade.update)
route.put('/cartao/fidelidade/:_idEstabelecimento/:_idUsuario', middleware.update, CartaoFidelidade.update)

route.put('/cartao/fidelidade/cpf/:_idEstabelecimento/:cpf', middleware.update, CartaoFidelidade.update)


route.delete('/cartao/fidelidade/:_id', middleware.destroy, CartaoFidelidade.destroy)
module.exports = route;