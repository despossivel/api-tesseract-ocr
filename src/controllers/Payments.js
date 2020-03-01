const ModelPayment = require('../models/Payment');
const ModelEstabelecimento = require('../models/Estabelecimento');


class Payments {

	/* constructor(application) {
		this.application = application;
		Model = this.application.src.models.Payment;
		this.modalEstabelecimento = this.application.src.models.Estabelecimento;
	} */


	async index(req, res) {
		const payments = await Model.find().catch(e => console.log(e))
		payments.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum pagamento encontrado!" }] }) :
			res.status(200).send(payments.data);

	}

	async show(req, res) {
		const { _id } = req.params;
		const payment = await Model.findById({ _id }).catch(e => console.log(e))
		payment.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o pagamento" }] }) :
			res.status(200).send(payment.data);
	}

	async store(req, res) {
		const cielo = new this.application.src.services.Cielo(this.application)

		let { _idUsuario, _idEstabelecimento, Type, Amount, ...card } = req.body;

		const payment = {
			Type,
			Amount
		};

		const Transation = await cielo.payment(card, payment);

		//https://developercielo.github.io/manual/cielo-ecommerce#resposta
		switch (parseInt(Transation.Payment.ReturnCode)) {
			case 4:
			case 6:
				const { MerchantOrderId } = Transation;
				const paymentSave = await Model.create({
					MerchantOrderId,
					_idUsuario,
					_idEstabelecimento,
					Customer: '',
					Transation
				});

				await ModelEstabelecimento.updateOne({
					_id: _idEstabelecimento
				}, {
					status: true,
					licence: true
				})

				paymentSave.n == 0 ?
					res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
					res.status(200).send(paymentSave.data);

				break;

			case 5: //Não Autorizada
			case 57: //Cartão Expirado
			case 78: //Cartão Bloqueado
			case 99: //Time Out
			case 77: //Cartão Cancelado
			case 70: //Problemas com o Cartão de Crédito
				res.send({ errors: [{ "msg": Transation.Payment.ReturnMessage }], status: 404 })
				break;

		}

	}

}

module.exports = new Payments();