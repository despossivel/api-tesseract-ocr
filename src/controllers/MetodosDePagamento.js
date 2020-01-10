const ObjectId = require('mongodb').ObjectID;

class MetodosDePagamento {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.MetodosDePagamento;
	}

	async index(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const metodosDePagamento = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.middlewares.Response
		response.send(res, metodosDePagamento)

	}

	async show(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const metodoDePagamento = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		const response = this.application.src.middlewares.Response
		response.send(res, [metodoDePagamento])
	}

	async store(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const metodoDePagamento = await this.model.create(req.body);
		const response = this.application.src.middlewares.Response
		response.send(res, [metodoDePagamento])
	}

	async update(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const metodoDePagamento = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.middlewares.Response
		response.send(res, [metodoDePagamento])

	}

	async destroy(req, res) {
		this.application.src.middlewares.validationResult(req, res);
		const metodoDePagamento = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.middlewares.Response
		response.send(res, [metodoDePagamento])
	}

}

module.exports = () => MetodosDePagamento;