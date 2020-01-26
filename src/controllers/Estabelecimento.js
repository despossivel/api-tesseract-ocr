//const Treatment =  require('../utils/Treatment');


class Estabelecimento {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Estabelecimento;
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

			const estabelecimentos = await this.model.find({}, {}).catch(e => console.log(e))
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
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const estabelecimento = await this.model.updateOne({ _id }, doc);
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async destroy(req, res) {
		const estabelecimento = await this.model.deleteOne({ _id: req.body._id });

		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

 
	}

}

module.exports = () => Estabelecimento;