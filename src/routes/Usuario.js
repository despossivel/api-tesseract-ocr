const { check } = require('express-validator');

module.exports = (application) => {
	const Usuario = new application.src.controllers.Usuario(application);

	application.get('/usuarios', application.src.middlewares.routes.usuario.index, (req, res) => Usuario.index(req, res))

	application.get('/usuario/:_id', application.src.middlewares.routes.usuario.show, (req, res) => Usuario.show(req, res))

	application.post('/usuario/store', application.src.middlewares.routes.usuario.store, (req, res) => Usuario.store(req, res))

	application.put('/usuario/update', application.src.middlewares.routes.usuario.update, (req, res) => Usuario.update(req, res))

	application.delete('/usuario/destroy', application.src.middlewares.routes.usuario.destroy, (req, res) => Usuario.destroy(req, res))

}