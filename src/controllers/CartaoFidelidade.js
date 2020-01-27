const mongoose = require('mongoose');

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

	//index – Lista os dados da tabela
	async index(req, res) {

		let find = req.query;
		find._idUsuario = mongoose.Types.ObjectId(find._idUsuario)

		const cartoesFidelidade = await this.model.aggregate().lookup(
			{
				from: 'estabelecimentos', localField: '_idEstabelecimento',
				foreignField: '_id', as: 'estabelecimento'
			}).match(find);


		let response = cartoesFidelidade.map(c => {
			let { pontos, estabelecimento } = c;
			[estabelecimento] = estabelecimento;
			return { pontos, ...estabelecimento };
		})

		response = this.jsonResponse(response);
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

		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const cartaoFidelidade = await this.model.updateOne({ _id }, doc);
		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	//destroy – Remove o dado
	async destroy(req, res) {

		const cartaoFidelidade = await this.model.deleteOne({ _id: req.body._id });
		let response = cartaoFidelidade;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}


}

module.exports = () => CartaoFidelidade;