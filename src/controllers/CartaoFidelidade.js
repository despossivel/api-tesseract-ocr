class CartaoFidelidade {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.CartaoFidelidade;
	}

	//index – Lista os dados da tabela
	async index(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const cartoesFidelidade = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.middlewares.Response
		response.send(res, cartoesFidelidade)

	}


	async show(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const cartaoFidelidade = await this.model.find({ _id: req.params._id }).catch(e => console.log(e))
		const response = this.application.src.middlewares.Response
		response.send(res, [cartaoFidelidade])
	}


	async store(req, res) {
		this.application.src.middlewares.validationResult(req, res); 
		const cartaoFidelidade = await this.model.create(req.body);
		const response = this.application.src.middlewares.Response
		response.send(res, [cartaoFidelidade])
	}

	//update – Salva a atualização do dado
	async update(req, res) {
		this.application.src.middlewares.validationResult(req, res); 
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const cartaoFidelidade = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.middlewares.Response
		response.send(res, [cartaoFidelidade])

	}

	//destroy – Remove o dado
	async destroy(req, res) {
		this.application.src.middlewares.validationResult(req, res); 
		const cartaoFidelidade = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.middlewares.Response
		response.send(res, [cartaoFidelidade])
	}


}

module.exports = () => CartaoFidelidade;