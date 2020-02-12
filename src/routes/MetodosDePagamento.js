const { check } = require('express-validator');

module.exports = (application) => {
   const MetodosDePagamento = new application.src.controllers.MetodosDePagamento(application);

   application.get('/metodos/pagamento', application.src.middlewares.routes.metodosDePagamento.index, (req, res) => MetodosDePagamento.index(req, res))

   application.get('/metodo/pagamento/:cvv/:_id', application.src.middlewares.routes.metodosDePagamento.show, (req, res) => MetodosDePagamento.show(req, res))

   application.post('/metodo/pagamento/store', application.src.middlewares.routes.metodosDePagamento.store, (req, res) => MetodosDePagamento.store(req, res))

   application.put('/metodo/pagamento/update', application.src.middlewares.routes.metodosDePagamento.update, (req, res) => MetodosDePagamento.update(req, res))

   application.delete('/metodo/pagamento/destroy', application.src.middlewares.routes.metodosDePagamento.destroy, (req, res) => MetodosDePagamento.destroy(req, res))

}