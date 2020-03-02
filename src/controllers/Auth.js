const JWT = require('../middlewares/Jwt');
const blowfish = require('../utils/blowfish');
const Model = require('../models/Usuario');

class Auth {

	constructor() { }

	async show(req, res, next) {
		const { email, senha } = req.body;
 

		const token = JWT.sing({});
		const senhaEncrypt = blowfish.encrypt(senha)
		const login = await Model.findOne({ email, senha: senhaEncrypt, status: true }).catch(e => console.log(e))
		let response;

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