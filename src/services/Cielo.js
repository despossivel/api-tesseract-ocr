class Cielo {

	constructor(application) {
		this.GATEWAY = application.src.config.cielo;
	}

	async payment(card, payment) {

		const dadosSale = {
			"MerchantOrderId": Math.random() * (9999 - 1) + 123,
			"Customer": {
				"Name": "Centavus Leilões Online"
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
				return await this.credit(dadosSale).catch(e => console.error(e));
				break;

			case 'DebitCard':
				return await this.debit(dadosSale).catch(e => console.error(e));
				break;
		}
	}

	credit = async (sale) => await this.GATEWAY.creditCard.completeTransaction(sale)
		.catch(error => console.error(error));

	debit = async (sale) => await this.GATEWAY.debitCard.simpleTransaction(sale)
		.catch(error => console.error(error));


	consulting = async (paymentId) => await this.GATEWAY.consulting.sale(paymentId)
		.catch(e => console.error(e));


}


module.exports = () => Cielo;