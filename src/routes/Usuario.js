const { check } = require('express-validator');

module.exports = (application) => {
	const Usuario = new application.src.controllers.Usuario(application);

	application.get('/usuarios', [
		application.src.middlewares.Jwt.verify
	], (req, res) => Usuario.index(req, res))

	application.get('/usuario/:_id', [application.src.middlewares.Jwt.verify,
	check('_id').notEmpty()], (req, res) => Usuario.show(req, res))

	application.post('/usuario/store', [
		application.src.middlewares.Jwt.verify,
		check('nome').notEmpty(),
		check('usuario').notEmpty(),
		check('email').notEmpty().isEmail(),
		check('cidade').notEmpty(),
		check('estado').notEmpty().isLength({ max: 2 }),
		check('senha').notEmpty().isLength({ min: 5 }),
		check('telefone').notEmpty()
	], (req, res) => Usuario.store(req, res))

	application.put('/usuario/update', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty()
	], (req, res) => Usuario.update(req, res))

	application.delete('/usuario/destroy', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty()
	], (req, res) => Usuario.destroy(req, res))

}