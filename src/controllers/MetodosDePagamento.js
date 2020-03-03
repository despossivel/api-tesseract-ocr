const Model = require('../models/MetodosDePagamento');

class MetodosDePagamento {


	async index(req, res) {
		const metodosDePagamento = await Model.find().catch(e => console.log(e))
		metodosDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum metodo de pagamento encontrado!" }] }) :
			res.status(200).send(metodosDePagamento);
	}

	async show(req, res) {
		const { _id, cvv } = req.params;
		const metodoDePagamento = await Model.findById({ _id, cvv }).catch(e => console.log(e))
		metodoDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o metodo de pagamento encontrado!" }] }) :
			res.status(200).send([metodoDePagamento]);
	}

	async store(req, res) {
		const metodoDePagamento = await Model.create(req.body);
		metodoDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel adicionar o metodo de pagamento!" }] }) :
			res.status(200).send(metodoDePagamento);
	}

	async update(req, res) {
		const _id = req.params;
		const doc = req.body;
		const metodoDePagamento = await Model.updateOne({ _id }, doc);
		metodoDePagamento.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar o metodo de pagamento!" }] }) :
			res.status(200).send(metodoDePagamento);
	}

	async destroy(req, res) {
		const { _id } = req.params;
		const metodoDePagamento = await Model.deleteOne({ _id });
		metodoDePagamento.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel remover o metodo de pagamento!" }] }) :
			res.status(200).send(metodoDePagamento);
	}

}

module.exports = new MetodosDePagamento();