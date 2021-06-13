const mongoose = require('mongoose'),
	Model = require('../models/Order');

class Order {

	async index(req, res) {
		let find = req.query;

		find._idEstabelecimento ?
			find._idEstabelecimento = mongoose.Types.ObjectId(find._idEstabelecimento)
			: find = {};

		const order = await Model.find(find).catch(e => console.log(e))
		order.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhuma order encontrada no momento!" }] }) :
			res.status(200).send(order);

	}

	async show(req, res) {
		const { _id } = req.params;
		const order = await Model.findById({ _id }).catch(e => console.log(e))
		order.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "order não encontrada!" }] }) :
			res.status(200).send([order]);
	}

	async store(req, res) {
		const order = await Model.create({ ...req.body });
		order.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possiel criar a order!" }] }) :
			res.status(200).send(order);
	}

	async update(req, res) {
		const { _id } = req.params;
		const doc = req.body;
		const order = await Model.updateOne({ _id }, doc);
		order.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar a order!" }] }) :
			res.status(200).send(order);
	}

	async destroy(req, res) {
		const { _id } = req.params;
		const order = await Model.deleteOne({ _id });
		order.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel remover a order" }] }) :
			res.status(200).send(order);
	}

}



module.exports = new Order();