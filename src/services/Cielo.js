const config = require('../config/cielo');

class Cielo {

	constructor() {
		this.GATEWAY = config;
	}

	async payment(card, payment) {

		const dadosSale = {
			"MerchantOrderId": Math.random() * (9999 - 1) + 123,
			"Customer": {
				"Name": "Chega Rapido Express Online"
			},
			"Payment": {
				...payment,
				"ReturnUrl": "http://www.cielo.com.br",
				"Installments": 1,
				"SoftDescriptor": "Centavus",
				[payment.Type]: {
					...card,
					"CardOnFile": {
						"Usage": "Used",
						"Reason": "Unscheduled"
					}
				}
			}
		};


		switch (payment.Type) {
			case 'CreditCard':
				const responseCredit = await this.credit(dadosSale).catch(e => console.error(e));
				return responseCredit;
				break;

			case 'DebitCard':
				const responseDebit = await this.debit(dadosSale).catch(e => console.error(e));
				return responseDebit;
				break;
		}
	}

	credit = async sale => await this.GATEWAY.creditCard.completeTransaction(sale)
		.catch(error => console.error(error));

	debit = async sale => await this.GATEWAY.debitCard.simpleTransaction(sale)
		.catch(error => console.error(error));

	consulting = async paymentId => await this.GATEWAY.consulting.sale(paymentId)
		.catch(e => console.error(e));

}

module.exports = Cielo;