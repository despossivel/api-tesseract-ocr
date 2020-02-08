const ObjectId = require('mongodb').ObjectID;

class Payments {

	constructor(application) {
		this.application = application;
		this.model = this.application.src.models.Payment;
	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}

	async index(req, res) {

		const payments = await this.model.find().catch(e => console.log(e))
		let response = payments;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

	async show(req, res) {

		const payment = await this.model.findById({ _id: req.params._id }).catch(e => console.log(e))
		//const cielo = new this.application.src.services.Cielo(this.application);
		//const consulta = await cielo.consulting(payment.Payment.PaymentId)
		let response = payment;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);
	}

	async store(req, res) {

		const cielo = new this.application.src.services.Cielo(this.application)

		let { _idUsuario, _idEstabelecimento, Type, Amount, ...card } = req.body;

		const payment = {
			Type,
			Amount
		};

		const [Transation] = await cielo.payment(card, payment);
		const { MerchantOrderId } = Transation;
		const paymentSave = await this.model.create({
			MerchantOrderId,
			_idUsuario,
			_idEstabelecimento,
			Customer: '',
			Transation
		});

		let response = paymentSave;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}


    /*
	async update(req, res) {
		
		const _id = req.body._id;
		let doc = req.body;
		delete doc._id;

		const payment = await this.model.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [payment])

	}

	async destroy(req, res) {
		
		const payment = await this.model.deleteOne({ _id: req.body._id });
		const response = this.application.src.utils.Response
		response.send(res, [payment])
    }
    */

}

module.exports = () => Payments;