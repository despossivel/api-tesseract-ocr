const { check } = require('express-validator');

module.exports = (application) => {
	const Auth = new application.src.controllers.Auth(application);

	application.post('/auth', [
		check('email').exists().notEmpty().isEmail(),
		check('senha').exists().notEmpty().isLength({ min: 5 }),
		application.src.middlewares.expressValidation.validation
	], (req, res) => Auth.show(req, res))

}