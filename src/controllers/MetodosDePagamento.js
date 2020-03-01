const Model = require('../models/MetodosDePagamento');

class MetodosDePagamento {
 

	async index(req, res) {
		const metodosDePagamento = await Model.find().catch(e => console.log(e))
		metodosDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum metodo de pagamento encontrado!" }] }) :
			res.status(200).send(metodosDePagamento.data);
	}

	async show(req, res) {
		const { _id } = req.params;
		const metodoDePagamento = await Model.findById({ _id }).catch(e => console.log(e))
		metodosDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o metodo de pagamento encontrado!" }] }) :
			res.status(200).send(metodosDePagamento.data);
	}

	async store(req, res) {
		const metodoDePagamento = await Model.create(req.body);
		metodosDePagamento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel adicionar o metodo de pagamento!" }] }) :
			res.status(200).send(metodosDePagamento.data);
	}

	async update(req, res) {
		const { _id, ...doc } = req.body._id;
		const metodoDePagamento = await Model.updateOne({ _id }, doc);
		metodosDePagamento.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel atualizar o metodo de pagamento!" }] }) :
			res.status(200).send(metodosDePagamento.data);
	}

	async destroy(req, res) {
		const { _id } = req.body;
		const metodoDePagamento = await Model.deleteOne({ _id });
		metodosDePagamento.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel remover o metodo de pagamento!" }] }) :
			res.status(200).send(metodosDePagamento.data);
	}

}

module.exports = new MetodosDePagamento();