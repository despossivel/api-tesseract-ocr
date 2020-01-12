class Auth {

	constructor(application) {
		this.application = application;
		this.JWT = application.src.middlewares.Jwt;
		this.blowfish = this.application.src.utils.blowfish;
		this.models = this.application.src.models;
	}

	async show(req, res) {
		const body = req.body;
		const token = this.JWT.sing({});

		body.password = this.blowfish.encrypt(body.password)

		const login = await this.models.Usuario.find({ email: body.email, password: body.password }).catch(e => console.log(e))
		const response = this.application.src.utils.Response;
 
		response.send(res, { token })
	}

}

module.exports = () => Auth;