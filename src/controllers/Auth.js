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

		const login = await this.models.Usuario.findOne({ email, senha: senhaEncrypt, status: true }).catch(e => console.log(e))
	 	const { fotoUrl } = login;
		const response = {
			...login._doc,
			fotoUrl,
			token
		}; 

		login ? res.status(200).send(response)
			: res.status(404).send({ errors: [{ "msg": "Usuario não encontrado!" }], status: 404 })

	}

}

module.exports = () => Auth;