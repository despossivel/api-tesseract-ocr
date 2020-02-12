const { check } = require('express-validator');

module.exports = (application) => {
  const CartaoFidelidade = new application.src.controllers.CartaoFidelidade(application);

  application.get('/cartoes/fidelidade', application.src.middlewares.routes.cartaoFidelidade.index, (req, res) => CartaoFidelidade.index(req, res))

  application.get('/cartao/fidelidade/:_id', application.src.middlewares.routes.cartaoFidelidade.show, (req, res) => CartaoFidelidade.show(req, res))

  application.post('/cartao/fidelidade/store', application.src.middlewares.routes.cartaoFidelidade.store, (req, res) => CartaoFidelidade.store(req, res))

  application.put('/cartao/fidelidade/update', application.src.middlewares.routes.cartaoFidelidade.update, (req, res) => CartaoFidelidade.update(req, res))

  application.delete('/cartao/fidelidade/destroy', application.src.middlewares.routes.cartaoFidelidade.destroy, (req, res) => CartaoFidelidade.destroy(req, res))

}