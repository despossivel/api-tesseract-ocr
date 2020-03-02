//const { check, body } = require('express-validator');
const { Router } = require('express');
const route = new Router();

const middleware = require('../middlewares/routes/estabelecimento');
const Estabelecimento = require('../controllers/Estabelecimento');

route.get('/estabelecimentos', middleware.index, Estabelecimento.index)
route.get('/estabelecimento/:_id', middleware.show, Estabelecimento.show)
route.post('/estabelecimento', middleware.store, Estabelecimento.store)
route.put('/estabelecimento/:_id', middleware.update, Estabelecimento.update)
route.delete('/estabelecimento/:_id', middleware.destroy, Estabelecimento.destroy)
 
module.exports = route;
 