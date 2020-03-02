const { Route } = require('express');
const route = new Route();

const middleware = require('../middlewares/routes/metodosDePagamento');
const MetodosDePagamento = require('../controllers/MetodosDePagamento');

route.get('/metodos/pagamento', middleware.index, MetodosDePagamento.index)
route.get('/metodo/pagamento/:cvv/:_id', middleware.show, MetodosDePagamento.show)
route.post('/metodo/pagamento', middleware.store, MetodosDePagamento.store)
route.put('/metodo/pagamento/:_id', middleware.update, MetodosDePagamento.update)
route.delete('/metodo/pagamento/:_id', middleware.destroy, MetodosDePagamento.destroy)

module.exports = route;