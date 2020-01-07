const { check } = require('express-validator');

module.exports = (application) =>{
  	const CupomDesconto = new application.src.controllers.CupomDesconto(application);

  	application.get('/cupons/desconto',[
        application.src.middlewares.Jwt.verify
      ],(req, res) =>  CupomDesconto.index(req, res))

    application.get('/cupom/desconto/:_id',[application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()], (req, res) =>  CupomDesconto.show(req, res))

    application.post('/cupom/desconto/store', [
        application.src.middlewares.Jwt.verify,
    	check('_idEstabelecimento').notEmpty(),
        check('valor').notEmpty(),
        check('validade').notEmpty() 
    	], (req, res) =>  CupomDesconto.store(req, res))

    application.put('/cupom/desconto/update',[
        application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()
        ], (req, res) =>  CupomDesconto.update(req, res))

    application.delete('/cupom/desconto/destroy',[
        application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()
        ], (req, res) =>  CupomDesconto.destroy(req, res))

}