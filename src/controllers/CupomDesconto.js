class CupomDesconto {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.CupomDesconto;

	}
 
	async index(req,res){
		const cuponsDesconto = await this.model.find().catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cuponsDesconto)
	}
 
	async show(req,res){
		const cupomDesconto = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, cupomDesconto)
	}
 
	store(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('cupom desconto')
	}
 
	update(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cupom desconto')
	}
 
	destroy(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('Cupom desconto')
	}


}

module.exports = () => CupomDesconto;