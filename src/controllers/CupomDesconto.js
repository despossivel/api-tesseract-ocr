class CupomDesconto {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.CupomDesconto;

	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
    }

	async index(req, res) {
	
		const cuponsDesconto = await this.model.find().catch(e => console.log(e))
		let response = cuponsDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async show(req, res) {
	
		const cupomDesconto = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		let response = cupomDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}


	async store(req, res) {
	
		const cupomDesconto = await this.model.create(req.body);
		let response = cupomDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async update(req, res) {
	
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const cupomDesconto = await this.model.updateOne({ _id }, doc);
		let response = cupomDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async destroy(req, res) {
	
		const cupomDesconto = await this.model.deleteOne({ _id: req.body._id });
		let response = cupomDesconto;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

}

module.exports = () => CupomDesconto;