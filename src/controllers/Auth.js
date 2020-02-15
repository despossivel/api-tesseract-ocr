class Auth {

	constructor(application) {
		this.application = application;
		this.JWT = application.src.middlewares.Jwt;
		this.blowfish = this.application.src.utils.blowfish;
		this.models = this.application.src.models;
	}

	async show(req, res) {
		const { email, senha } = req.body;
		const token = this.JWT.sing({});
		const senhaEncrypt = this.blowfish.encrypt(senha)
		
		const login = await this.models.Usuario.find({ email, senha: senhaEncrypt, status: true }).catch(e => console.log(e))
		let [response] = login;

		login.length == 0
			? response = { errors: [{ "msg": "Usuario não encontrado!" }], status: 404 }
			: response = { token, ...response._doc, status: 200 }

		const { status, ..._response_ } = response;
		res.status(status).send(_response_);

	}

}

module.exports = () => Auth;