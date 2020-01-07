const { check } = require('express-validator');

module.exports = (application) =>{
  	const Estabelecimento = new application.src.controllers.Estabelecimento(application);

  	application.get('/estabelecimentos',[application.src.middlewares.Jwt.check],(req, res) =>  Estabelecimento.index(req, res))

    application.get('/estabelecimento/:_id',[
		application.src.middlewares.Jwt.check,
		check('_id').notEmpty()], (req, res) =>  Estabelecimento.show(req, res))

    application.post('/estabelecimento/store', [
		application.src.middlewares.Jwt.check,
		check('nome').notEmpty(),
    	check('nomeFantasia').notEmpty(),
    	check('cnpj').notEmpty(),
    	check('email').notEmpty().isEmail(),
    	check('senha').notEmpty()
    	], (req, res) =>  Estabelecimento.store(req, res))

    application.put('/estabelecimento/update',[
		application.src.middlewares.Jwt.check,
    	check('_id').notEmpty()
    	], (req, res) =>  Estabelecimento.update(req, res))

    application.delete('/estabelecimento/destroy',[
		application.src.middlewares.Jwt.check,
    	check('_id').notEmpty()
    	], (req, res) =>  Estabelecimento.destroy(req, res))

}