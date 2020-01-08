const { check } = require('express-validator');
 
module.exports = (application) => {
	const Estabelecimento = new application.src.controllers.Estabelecimento(application);

	application.get('/estabelecimentos', [application.src.middlewares.Jwt.verify], (req, res) => Estabelecimento.index(req, res))

	application.get('/estabelecimento/:_id', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty()], (req, res) => Estabelecimento.show(req, res))

	application.post('/estabelecimento/store', [
		application.src.middlewares.Jwt.verify,
		check('nome').notEmpty(),
		check('nomeFantasia').notEmpty(),

		check('cnpj').notEmpty().custom((value) => {
			return this.src.models.Estabelecimento.findOne({ cnpj: value }).then(cnpj=>{
				 if(cnpj){
					 return Promise.reject('Cnpj já está em uso')
				 }
			 })
	   }),
 
		check('email').notEmpty().isEmail().custom((value) => {
			return this.src.models.Estabelecimento.findOne({ email: value }).then(email=>{
				 if(email){
					 return Promise.reject('E-mail já está em uso')
				 }
			 })
	   }),
		check('senha').notEmpty()
	], (req, res) => Estabelecimento.store(req, res))

	application.put('/estabelecimento/update', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty()
	], (req, res) => Estabelecimento.update(req, res))

	application.delete('/estabelecimento/destroy', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty()
	], (req, res) => Estabelecimento.destroy(req, res))

}