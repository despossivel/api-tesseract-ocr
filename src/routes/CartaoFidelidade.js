const { check } = require('express-validator');

module.exports = (application) =>{
  	const CartaoFidelidade = new application.src.controllers.CartaoFidelidade(application);

 
  	application.get('/cartoes/fidelidade',[],(req, res) =>  CartaoFidelidade.index(req, res))

    application.get('/cartao/fidelidade/:_id',[check('_id').notEmpty()], (req, res) =>  CartaoFidelidade.show(req, res))

    application.post('/cartao/fidelidade/store', [
			check('_idEstabelecimento').notEmpty(),
			check('_idUsuario').notEmpty(),
			check('pontos').notEmpty(),
    	], (req, res) =>  CartaoFidelidade.store(req, res))

    application.put('/cartao/fidelidade/update',[
      check('_id').notEmpty()
      ], (req, res) =>  CartaoFidelidade.update(req, res))

    application.delete('/cartao/fidelidade/destroy',[
      check('_id').notEmpty()
      ], (req, res) =>  CartaoFidelidade.destroy(req, res))

}