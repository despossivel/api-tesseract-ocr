const { check } = require('express-validator');

module.exports = (application) => {
   const MetodosDePagamento = new application.src.controllers.MetodosDePagamento(application);

   application.get('/metodos/pagamento', [
      application.src.middlewares.Jwt.verify
   ], (req, res) => MetodosDePagamento.index(req, res))

   application.get('/metodo/pagamento/:cvv/:_id', [
      application.src.middlewares.Jwt.verify,
      check('cvv').notEmpty(),
      check('_id').notEmpty(),
      ], (req, res) => MetodosDePagamento.show(req, res))

   application.post('/metodo/pagamento/store', [
      application.src.middlewares.Jwt.verify,
      check('_idUsuario').notEmpty(),
      check('tipo').notEmpty(),
      check('titular').notEmpty(),
      check('numero').notEmpty(),
      check('mes').notEmpty(),
      check('ano').notEmpty(),
   ], (req, res) => MetodosDePagamento.store(req, res))

   application.put('/metodo/pagamento/update', [
      application.src.middlewares.Jwt.verify,
      check('_id').notEmpty()
   ], (req, res) => MetodosDePagamento.update(req, res))

   application.delete('/metodo/pagamento/destroy', [
      application.src.middlewares.Jwt.verify,
      check('_id').notEmpty()
   ], (req, res) => MetodosDePagamento.destroy(req, res))

}