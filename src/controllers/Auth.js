class Auth {

	constructor(application) {
		this.application = application;
		this.JWT = application.src.middlewares.Jwt;
		this.blowfish = this.application.src.utils.blowfish;
		this.models = this.application.src.models;
	}

	async show(req, res) {
		this.application.src.utils.validationResult(req, res);

		const body = req.body;
		const token = this.JWT.sing({});

		body.senha = this.blowfish.encrypt(body.senha)

		const login = await this.models.Usuario.find({ email: body.email, senha: body.senha }).catch(e => console.log(e))
		console.log(login)

	 
				login.length == 0 
						? login.push({errors:[
							{
								"msg":"Usuario não encontrado!",
								
							}
						]}) 
						: login.push({ token });
		 
		const response = this.application.src.utils.Response;

		response.send(res, login)
	}

}

module.exports = () => Auth;