const { validationResult } = require('express-validator');

const responseError = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

}

module.exports = () => responseError