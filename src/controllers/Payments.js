const ObjectId = require('mongodb').ObjectID;

class Payments {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Payment;
	}

	async index(req, res) {
		//this.application.src.utils.validationResult(req, res);
		const payments = await this.model.find().catch(e => console.log(e))
		const response = this.application.src.utils.Response
		response.send(res, payments)

	}

	async show(req, res) {
		//this.application.src.utils.validationResult(req, res);
		const payment = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		//const cielo = new this.application.src.services.Cielo(this.application);
		//const consulta = await cielo.consulting(payment.Payment.PaymentId)
		const response = this.application.src.utils.Response
		response.send(res, [payment])
	}

	async store(req, res) {
		//this.application.src.utils.validationResult(req, res);
		const cielo = new this.application.src.services.Cielo(this.application)

		let card = { ...req.body };

		const payment = {
			Type: req.body.Type,
			Amount: req.body.Amount
		};

		delete card.Type;
		delete card.Amount;

		const transation = await cielo.payment(card, payment);
		const paymentSave = await this.model.create(transation);
		const response = this.application.src.utils.Response
		response.send(res, [paymentSave])

	}


    /*
	async update(req, res) {
		//this.application.src.utils.validationResult(req, res);
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const payment = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [payment])

	}

	async destroy(req, res) {
		//this.application.src.utils.validationResult(req, res);
		const payment = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.utils.Response
		response.send(res, [payment])
    }
    */

}

module.exports = () => Payments;