const ObjectId = require('mongodb').ObjectID;

class MetodosDePagamento {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.MetodosDePagamento;
	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}

	async index(req, res) {
		const metodosDePagamento = await this.model.find().catch(e => console.log(e))
		let response = metodosDePagamento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async show(req, res) {
		const { _id } = req.params;
		const metodoDePagamento = await this.model.findById({ _id }).catch(e => console.log(e))
		let response = metodoDePagamento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {
		const metodoDePagamento = await this.model.create(req.body);
		let response = metodoDePagamento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async update(req, res) {
		const { _id, ...doc } = req.body._id;
		const metodoDePagamento = await this.model.updateOne({ _id }, doc);
		let response = metodoDePagamento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async destroy(req, res) {
		const { _id } = req.body;
		const metodoDePagamento = await this.model.deleteOne({ _id });
		let response = metodoDePagamento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}

module.exports = () => MetodosDePagamento;