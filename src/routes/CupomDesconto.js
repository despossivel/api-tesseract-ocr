const { check } = require('express-validator');

module.exports = (application) =>{
  	const CupomDesconto = new application.src.controllers.CupomDesconto(application);

  	application.get('/cupons/desconto',[],(req, res) =>  CupomDesconto.index(req, res))

    application.get('/cupom/desconto/:_id',[check('_id').notEmpty()], (req, res) =>  CupomDesconto.show(req, res))

    application.post('/cupom/desconto/store', [
    	check('_idEstabelecimento').notEmpty(),
        check('valor').notEmpty(),
        check('validade').notEmpty() 
    	], (req, res) =>  CupomDesconto.store(req, res))

    application.put('/cupom/desconto/update',[
        check('_id').notEmpty()
        ], (req, res) =>  CupomDesconto.update(req, res))

    application.delete('/cupom/desconto/destroy',[
        check('_id').notEmpty()
        ], (req, res) =>  CupomDesconto.destroy(req, res))

}