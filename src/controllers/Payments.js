const Cielo = require('../services/Cielo');

const ModelPayment = require('../models/Payment');
const ModelEstabelecimento = require('../models/Estabelecimento');


class Payments {

	async index(req, res) {
		const payments = await ModelPayment.find().catch(e => console.log(e))
		payments.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum pagamento encontrado!" }] }) :
			res.status(200).send(payments);

	}

	async show(req, res) {
		const { _id } = req.params;
		const payment = await ModelPayment.findById({ _id }).catch(e => console.log(e))
		payment.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o pagamento" }] }) :
			res.status(200).send([payment]);
	}

	async store(req, res) {
		const cielo = new Cielo();

		let { _idUsuario, _idEstabelecimento, Type, Amount, ...card } = req.body;

		const payment = {
			Type,
			Amount
		};

		const Transation = await cielo.payment(card, payment).catch(e => console.error(e));

		//https://developercielo.github.io/manual/cielo-ecommerce#resposta
		switch (parseInt(Transation.Payment.ReturnCode)) {
			case 4:
			case 6:
				const { MerchantOrderId } = Transation;
				const paymentSave = await ModelPayment.create({
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
					res.status(200).send(paymentSave);

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