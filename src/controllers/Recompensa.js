const mongoose = require('mongoose');

const Model = require('../models/Recompensa');

class Recompensa {




	async index(req, res) {
		let find = req.query;

		find._idEstabelecimento ?
			find._idEstabelecimento = mongoose.Types.ObjectId(find._idEstabelecimento)
			: find = {};

		const recompensa = await Model.find(find).catch(e => console.log(e))
		recompensa.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhuma recompensa encontrada no momento!" }] }) :
			res.status(200).send(recompensa);

	}

	async show(req, res) {
		const { _id } = req.params;
		const recompensa = await Model.findById({ _id }).catch(e => console.log(e))
		recompensa.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Recompensa não encontrada!" }] }) :
			res.status(200).send([recompensa]);
	}

	async store(req, res) {
		const recompensa = await Model.create({ ...req.body });
		recompensa.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possiel criar a recompensa!" }] }) :
			res.status(200).send(recompensa);
	}

	async update(req, res) {
		const { _id } = req.params;
		const doc = req.body;
		const recompensa = await Model.updateOne({ _id }, doc);
		recompensa.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar a recompensa!" }] }) :
			res.status(200).send(recompensa);
	}

	async destroy(req, res) {
		const { _id } = req.params;
		const recompensa = await Model.deleteOne({ _id });
		recompensa.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel remover a recompensa" }] }) :
			res.status(200).send(recompensa);
	}

}



module.exports = new Recompensa();