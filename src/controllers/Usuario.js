class Usuario {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.Usuario;
	}

	//index – Lista os dados da tabela
	async index(req,res){
		const usuarios = await this.model.find().catch(e=>console.log(e))
		const response = this.application.src.controllers.Response
		response.send(res, usuarios)
 		
	}

	//show – Mostra um item específico
	async show(req,res){
		const usuario = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, usuario)
	}




	//store – Salva o novo item na tabela
	store(req,res){
		this.application.src.middlewares.requestResponse(req,res)

		res.send('controller usuario')
	}

	//update – Salva a atualização do dado
	update(req,res){
		this.application.src.middlewares.requestResponse(req,res)

		res.send('controller usuario')
	}

	//destroy – Remove o dado
	destroy(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		
		res.send('controller usuario')
	}


	//edit – Retorna a View para edição do dado
	//edit(req,res){
	//	res.send('controller usuario')
	//}
	//create – Retorna a View para criar um item da tabela
	//create(req,res){
	//	this.application.src.middlewares.requestResponse(req,res)
	//
	//	res.send('controller usuario')
	//}

}

module.exports = () => Usuario;