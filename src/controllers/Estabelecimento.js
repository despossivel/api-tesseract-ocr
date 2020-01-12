
class Estabelecimento {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Estabelecimento;
	}

	async index(req, res) {
		this.application.src.utils.validationResult(req, res);
		const estabelecimentos = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, estabelecimentos)

	}

	async show(req, res) {
		this.application.src.utils.validationResult(req, res);
		const estabelecimento = await this.model.find({ _id: req.params._id }).catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, [estabelecimento])
	}

	async store(req, res) {

		this.application.src.utils.validationResult(req, res);
		const estabelecimento = await this.model.create(req.body);
		const response = this.application.src.utils.Response
		response.send(res, [estabelecimento])
	}

	async update(req, res) {
		this.application.src.utils.validationResult(req, res);
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const estabelecimento = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [estabelecimento])

	}

	async destroy(req, res) {
		this.application.src.utils.validationResult(req, res);
		const estabelecimento = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.utils.Response
		response.send(res, [estabelecimento])
	}

}

module.exports = () => Estabelecimento;