const { check } = require('express-validator');

module.exports = (application) => {
	const Auth = new application.src.controllers.Auth(application);

	application.post('/auth', [
		check('email').notEmpty().isEmail(),
		check('password').notEmpty().isLength({ min: 5 })
	],
		(req, res) => Auth.show(req, res))

}