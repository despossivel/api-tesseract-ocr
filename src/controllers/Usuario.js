const mongoose = require('mongoose');


class Usuario {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Usuario;
		this.blowfish = this.application.src.utils.blowfish;
		this.SMTP = this.application.src.services.SMTP;
	}

	jsonResponse(data) {
		let response;
		 data == null || data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}

	async index(req, res) {

		const usuarios = await this.model.find().catch(e => console.log(e))
		let response = usuarios;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async show(req, res) {
		const usuario = await this.model.findById({ _id:  mongoose.Types.ObjectId(req.params._id) }).catch(e => console.log(e))
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {
		const body = req.body;
		body.senha = this.blowfish.encrypt(body.senha)

		const usuario = await this.model.create(body);
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;


		await this.SMTP.send(body.email, 'Confirmar conta no Pinpper', 'Acesse o link para confirmar a sua conta', ``)

		
		res.status(status).send(_response_.data);
	}

	async update(req, res) {

		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		doc.senha = this.blowfish.encrypt(doc.senha)

		const usuario = await this.model.updateOne({ _id }, doc);
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async destroy(req, res) {

		const usuario = await this.model.deleteOne({ _id: req.body._id });
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}

module.exports = () => Usuario;