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
		const { _id } = req.params;

		const usuario = await this.model.findById({ _id }).catch(e => console.log(e))
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {
		const { senha, email } = req.body;
		const senhaEncrypt = this.blowfish.encrypt(senha)
		const doc = { senha: senhaEncrypt, ...req.body };
		const usuario = await this.model.create(doc);
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		const { _id } = _response_.data;

		await this.SMTP.send(email, 'Confirmar conta no Pinpper', `Acesse o link para confirmar a sua conta
			http://localhost:5000/public/confirmar/conta/${_id}`, ``).catch(e => console.error(e))

		res.status(status).send(_response_.data);
	}

	async update(req, res) {
		const { _id, senha, ...rest } = req.body;
		let doc = rest;

		if (senha) {
			const senhaEncrypt = this.blowfish.encrypt(senha)
			doc.senha = senhaEncrypt;
		}

		const usuario = await this.model.updateOne({ _id }, doc);
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async destroy(req, res) {
		const { _id } = req.body;
		const usuario = await this.model.deleteOne({ _id });
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}

module.exports = () => Usuario;