class CartaoFidelidade {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.CartaoFidelidade;
	}

	//index – Lista os dados da tabela
	async index(req, res){
		const cartoesFidelidade = await this.model.find().catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cartoesFidelidade)
	}

	//show – Mostra um item específico
	async show(req, res){
		const cartaoFidelidade = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cartaoFidelidade)
	}

	//store – Salva o novo item na tabela
	store(req, res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('cartao fidelidade')
	}

	//update – Salva a atualização do dado
	update(req, res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cartao fidelidade')
	}

	//destroy – Remove o dado
	destroy(req, res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cartao fidelidade')
	}


}

module.exports = () => CartaoFidelidade;