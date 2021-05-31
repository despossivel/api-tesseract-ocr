const JWT = require('../middlewares/Jwt'),
	blowfish = require('../utils/blowfish'),
	Model = require('../models/Usuario');

class Auth {

	constructor() { }

	async show(req, res, next) {
		const { email, senha } = req.body,
			token = JWT.sing({}),
			senhaEncrypt = blowfish.encrypt(senha);

		const login = await Model.findOne({ email, senha: senhaEncrypt }).catch(e => console.log(e));
		
		let response;

		if (login && !login._doc.hasOwnProperty('status')) return res
			.status(401)
			.send({
				errors: [{ "msg": "Usuario não confirmado, verifique seu e-mail!" }],
				status: 401
			});

		login ? response = {
			...login._doc,
			fotoUrl: login.fotoUrl,
			token
		} : {};

		login ? res.status(200).send(response)
			: res.status(404).send({ errors: [{ "msg": "Usuario não encontrado!" }], status: 404 })

	}

}

module.exports = new Auth();