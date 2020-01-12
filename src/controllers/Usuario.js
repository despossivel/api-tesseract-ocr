const ObjectId = require('mongodb').ObjectID;

class Usuario {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Usuario;
	}

	async index(req, res) {
		this.application.src.utils.validationResult(req, res);
		const usuarios = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, usuarios)

	}

	async show(req, res) {
		this.application.src.utils.validationResult(req, res);
		const usuario = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, [usuario])
	}

	async store(req, res) {
		this.application.src.utils.validationResult(req, res);
		const usuario = await this.model.create(req.body);
		const response = this.application.src.utils.Response
		response.send(res, [usuario])
	}

	async update(req, res) {
		this.application.src.utils.validationResult(req, res);
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const usuario = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [usuario])

	}

	async destroy(req, res) {
		this.application.src.utils.validationResult(req, res);
		const usuario = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.utils.Response
		response.send(res, [usuario])
	}

}

module.exports = () => Usuario;