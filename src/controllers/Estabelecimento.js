class Estabelecimento {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.Estabelecimento;
	}

	//index – Lista os dados da tabela
	async index(req, res){ 
	    const estabelecimentos = await this.model.find().catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, estabelecimentos)
	}

	//show – Mostra um item específico
	async show(req, res){ 
   		const estabelecimento = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, estabelecimento)
	}

	//store – Salva o novo item na tabela
	store(req, res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Estabelecimento')
		
	}
	
	//update – Salva a atualização do dado
	update(req, res){ 
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Estabelecimento')
	}

	//destroy – Remove o dado
	destroy(req, res){ 
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Estabelecimento')
	}


}

module.exports = () => Estabelecimento;