//const Treatment =  require('../utils/Treatment');
const mongoose = require('mongoose')

class Estabelecimento {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Estabelecimento;
		this.modelUsuario = this.application.src.models.Usuario;
	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}

	async index(req, res) {
		try {

			console.log(req.query)

			const estabelecimentos = await this.model.find({ ...req.query }).catch(e => console.log(e))
			let response = estabelecimentos;
			response = this.jsonResponse(response);
			const { status, ..._response_ } = response;
			res.status(status).send(_response_.data);
		} catch (e) {
			throw e;
		}
	}

	async show(req, res) {
		const estabelecimento = await this.model.find({ _id: req.params._id }).catch(e => console.log(e))
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {
		const estabelecimento = await this.model.create(req.body);
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async update(req, res) {
		const { _id, ...doc } = req.body;
		const estabelecimento = await this.model.updateOne({ _id }, doc);
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async destroy(req, res) {
		const { _id } = req.body;
		const estabelecimento = await this.model.deleteOne({ _id });
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}

module.exports = () => Estabelecimento;