const { check, body } = require('express-validator');

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
		check('cnpj').notEmpty().custom(async (value) => {
			const cnpj = await application.src.models.Estabelecimento.findOne({ cnpj: value })
			if (cnpj) {
				throw new Error('Cnpj já está em uso')
			}
		}),
		check('email').notEmpty().isEmail().custom(async (value) => {
			const email = await application.src.models.Estabelecimento.findOne({ email: value })
			if (email) {
				throw new Error('E-mail já está em uso')
			}
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