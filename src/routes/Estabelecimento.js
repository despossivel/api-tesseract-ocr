const { check } = require('express-validator');

module.exports = (application) =>{
  	const Estabelecimento = new application.src.controllers.Estabelecimento(application);

  	application.get('/estabelecimentos',[],(req, res) =>  Estabelecimento.index(req, res))

    application.get('/estabelecimento/:_id',[check('_id').notEmpty()], (req, res) =>  Estabelecimento.show(req, res))

    application.post('/estabelecimento/store', [
		check('nome').notEmpty(),
    	check('nomeFantasia').notEmpty(),
    	check('cnpj').notEmpty(),
    	check('email').notEmpty().isEmail(),
    	check('senha').notEmpty()
    	], (req, res) =>  Estabelecimento.store(req, res))

    application.put('/estabelecimento/update',[
    	check('_id').notEmpty()
    	], (req, res) =>  Estabelecimento.update(req, res))

    application.delete('/estabelecimento/destroy',[
    	check('_id').notEmpty()
    	], (req, res) =>  Estabelecimento.destroy(req, res))

}