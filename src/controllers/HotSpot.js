class HotSpot {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.Hotspot;
	}

	//index – Lista os dados da tabela
	async index(req,res){
		const hotspots = await this.model.find().catch(e=>console.log(e))
		const response = this.application.src.controllers.Response
		response.send(res, hotspots)
 		
	}

	//show – Mostra um item específico
	async show(req,res){
		const hotspot = await this.model.findById({ _id: req.params._id }).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, [hotspot])
	}
 
	//store – Salva o novo item na tabela
	async store(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		const hotspot = await this.model.create(req.body);
		const response = this.application.src.controllers.Response
		response.send(res, [hotspot])
	}


	//update – Salva a atualização do dado
	async update(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		const _id = req.body._id;
		let doc = req.body;
			delete doc._id;

		const hotspot = await this.model.updateOne({ _id },doc);
		const response = this.application.src.controllers.Response
		response.send(res, [hotspot])
 
	}

	//destroy – Remove o dado
	async destroy(req,res){
		this.application.src.middlewares.requestResponse(req,res)
		const hotspot = await this.model.deleteOne({ _id:req.body._id });
		const response = this.application.src.controllers.Response
		response.send(res, [hotspot])
	}


}

module.exports = () => HotSpot;