const { check, body } = require('express-validator');

module.exports = (application) => {
	const Estabelecimento = new application.src.controllers.Estabelecimento(application);

	application.get('/estabelecimentos', application.src.middlewares.routes.estabelecimento.index, (req, res) => Estabelecimento.index(req, res))

	application.get('/estabelecimento/:_id', application.src.middlewares.routes.estabelecimento.show, (req, res) => Estabelecimento.show(req, res))

	application.post('/estabelecimento/store',
		// application.src.middlewares.routes.estabelecimento.store
		[
			application.src.middlewares.Jwt.verify,
			check('nome').notEmpty(),
			check('nomeFantasia').notEmpty(),
			check('cnpj').notEmpty().custom(async (value) => {
				return application.src.models.Estabelecimento.findOne({ cnpj: value }).then(cnpj => {
					if (cnpj) {
						return Promise.reject('Cnpj Já esta em uso')
					}
				})
			}),

			check('endereco').notEmpty(),
			check('telefone').notEmpty(),
			check('estado').notEmpty(),
			check('cidade').notEmpty(),
			


			check('_idUsuario').notEmpty(),
			application.src.middlewares.expressValidation.validation
		]
		, (req, res) => Estabelecimento.store(req, res))

	application.put('/estabelecimento/update', application.src.middlewares.routes.estabelecimento.update, (req, res) => Estabelecimento.update(req, res))

	application.delete('/estabelecimento/destroy', application.src.middlewares.routes.estabelecimento.destroy, (req, res) => Estabelecimento.destroy(req, res))

}