class Auth {

	constructor(application){
		this.application = application;
		this.JWT = application.src.middlewares.Jwt;
		this.blowfish =  this.application.src.middlewares.blowfish;
		this.models = this.application.src.models;
	}

	async show(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		const body = req.body;
		const token = this.JWT.sing({});
		
 			   body.password = this.blowfish.encrypt(body.password)
 
 		const login = await this.models.Usuario.find({ email: body.email, senha: body.senha }).catch(e=>console.log(e))
 		try{
 			const response = {};

 			if(login.lenght == 0){
 				response.error = true
 				response.mensage = 'Usuário não encontrado1' 
 				response.code = 401;
 			}else{
 				response.success = true;
 				response.token = token;
 				response.code = 200;
 			}

		 res.status(response.code).send(response);
		}catch(e){
			throw e;
		}
	}

}

module.exports = () => Auth;