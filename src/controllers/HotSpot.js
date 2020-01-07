class HotSpot {

	constructor(application){
		this.application = application;
		this.model = this.application.src.models.Hotspot;
	}

	//index – Lista os dados da tabela
	async index(req, res){ 
		const hotspots = await this.model.find().catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, hotspots)
	}

	//show – Mostra um item específico
	async show(req, res){ 
	    const hotspot = await this.model.find({ _id:req.params._id.value}).catch(e=>console.log(e))
 		const response = this.application.src.controllers.Response
		response.send(res, hotspot)
	}

	//create – Retorna a View para criar um item da tabela
	//create(req, res){ res.send('htospot')}

	//store – Salva o novo item na tabela
	store(req, res){
		this.application.src.middlewares.requestResponse(req,res)
		res.send('htospot')
	}

	//edit – Retorna a View para edição do dado
	//edit(req, res){ res.send('htospot')}

	//update – Salva a atualização do dado
	update(req, res){ 
		this.application.src.middlewares.requestResponse(req,res)
		res.send('htospot')
	}

	//destroy – Remove o dado
	destroy(req, res){ 
		this.application.src.middlewares.requestResponse(req,res)
		res.send('htospot')
	}


}

module.exports = () => HotSpot;