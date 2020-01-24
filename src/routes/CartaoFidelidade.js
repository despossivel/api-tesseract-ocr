const { check } = require('express-validator');

module.exports = (application) => {
  const CartaoFidelidade = new application.src.controllers.CartaoFidelidade(application);

  application.get('/cartoes/fidelidade', [
    application.src.middlewares.Jwt.verify
  ], (req, res) => CartaoFidelidade.index(req, res))

  application.get('/cartao/fidelidade/:_id', [
    application.src.middlewares.Jwt.verify,
    check('_id').notEmpty(),
    application.src.middlewares.expressValidation.validation
  ], (req, res) => CartaoFidelidade.show(req, res))

  application.post('/cartao/fidelidade/store', [
    application.src.middlewares.Jwt.verify,
    check('_idEstabelecimento').notEmpty(),
    check('_idUsuario').notEmpty(),
    check('pontos').notEmpty(),
    application.src.middlewares.expressValidation.validation
  ], (req, res) => CartaoFidelidade.store(req, res))

  application.put('/cartao/fidelidade/update', [
    application.src.middlewares.Jwt.verify,
    check('_id').notEmpty(),
    application.src.middlewares.expressValidation.validation
  ], (req, res) => CartaoFidelidade.update(req, res))

  application.delete('/cartao/fidelidade/destroy', [
    application.src.middlewares.Jwt.verify,
    check('_id').notEmpty(),
    application.src.middlewares.expressValidation.validation
  ], (req, res) => CartaoFidelidade.destroy(req, res))

}