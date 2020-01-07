class CupomDesconto {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.CupomDesconto;

	}

	//index – Lista os dados da tabela
	async index(req,res){
		const cuponsDesconto = await this.model.find().catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cuponsDesconto)
	}

	//show – Mostra um item específico
	async show(req,res){
		const cupomDesconto = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cupomDesconto)
	}

	//store – Salva o novo item na tabela
	store(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('cupom desconto')
	}

	//update – Salva a atualização do dado
	update(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cupom desconto')
	}

	//destroy – Remove o dado
	destroy(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cupom desconto')
	}


}

module.exports = () => CupomDesconto;