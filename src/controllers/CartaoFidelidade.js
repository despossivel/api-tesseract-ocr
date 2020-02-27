const mongoose = require('mongoose');
const ValidatorQuery = require('../utils/ValidatorQuery');

class CartaoFidelidade {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.CartaoFidelidade;
	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}


	async index(req, res) {

		const query = req.query;
		const { strategy, ...find } = ValidatorQuery(query);
		const modelStrategy = this.application.src.controllers.CartaoFidelidadeStrategy[strategy];
		const cartoesFidelidade = await modelStrategy(this.model, find)
		const response = this.jsonResponse(cartoesFidelidade);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}


	async show(req, res) {

		const cartaoFidelidade = await this.model.find({ _id: req.params._id }).catch(e => console.log(e))
		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}



	async store(req, res) {

		const cartaoFidelidade = await this.model.create(req.body);
		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	//update – Salva a atualização do dado
	async update(req, res) {

		const _idUsuario = mongoose.Types.ObjectId(req.body._idUsuario);
		const _idEstabelecimento = mongoose.Types.ObjectId(req.body._idEstabelecimento);
		const { _id, ...doc } = req.body;
		let cartaoFidelidade;

		const length = await this.model.countDocuments({ _idUsuario, _idEstabelecimento });
		if (length == 0) {
			cartaoFidelidade = await this.model.create(doc);
		} else {

			console.log(doc)
			
			cartaoFidelidade = await this.model.updateOne({ _idUsuario, _idEstabelecimento }, doc);
		}

		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	//destroy – Remove o dado
	async destroy(req, res) {

		const { _id } = req.body; //mongoose.Types.ObjectId(

		const cartaoFidelidade = await this.model.deleteOne({ _id });
		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}


}

module.exports = () => CartaoFidelidade;