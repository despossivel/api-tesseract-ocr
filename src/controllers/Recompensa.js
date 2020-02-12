const mongoose = require('mongoose');

class Recompensa {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Recompensa;

	}


	jsonResponse(data) {
		let response;
		data == null || data.length == 0
			? response = { errors: [{ "msg": "Nenhuma recompensa encontrada!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}



	async index(req, res) {
		let find = req.query;

		if (find._idEstabelecimento) {
			find._idEstabelecimento = mongoose.Types.ObjectId(find._idEstabelecimento)
		} else {
			find = {};
		}

		const cuponsDesconto = await this.model.find(find).catch(e => console.log(e))
		let response = cuponsDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async show(req, res) {
		const { _id } = req.params;
		const Recompensa = await this.model.findById({ _id }).catch(e => console.log(e))
		let response = Recompensa;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {
		const Recompensa = await this.model.create({ ...req.body });
		let response = Recompensa;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async update(req, res) {
		const { _id, ...doc } = req.body._id;
		const Recompensa = await this.model.updateOne({ _id }, doc);
		let response = Recompensa;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async destroy(req, res) {
		const { _id } = req.body;
		const Recompensa = await this.model.deleteOne({ _id });
		let response = Recompensa;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}



module.exports = () => Recompensa;