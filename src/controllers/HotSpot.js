class HotSpot {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Hotspot;
	}

	async index(req, res) {
		this.application.src.utils.validationResult(req, res);
		const hotspots = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, hotspots)

	}

	async show(req, res) {
		this.application.src.utils.validationResult(req, res);
		const hotspot = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, [hotspot])
	}

	async store(req, res) {
		this.application.src.utils.validationResult(req, res);
		const hotspot = await this.model.create(req.body);
		const response = this.application.src.utils.Response
		response.send(res, [hotspot])
	}

	async update(req, res) {
		this.application.src.utils.validationResult(req, res);
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const hotspot = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [hotspot])

	}

	async destroy(req, res) {
		this.application.src.utils.validationResult(req, res);
		const hotspot = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.utils.Response
		response.send(res, [hotspot])
	}


}

module.exports = () => HotSpot;