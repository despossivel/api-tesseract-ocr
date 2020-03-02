const mongoose = require('mongoose');
const ValidatorQuery = require('../utils/ValidatorQuery');

const Model = require('../models/CartaoFidelidade');
const CartaoFidelidadeStrategy = require('../controllers/CartaoFidelidadeStrategy')

class CartaoFidelidade {

	constructor() { }


	async index(req, res) {

		const query = req.query;
		const { strategy, ...find } = ValidatorQuery(query);
		const modelStrategy = CartaoFidelidadeStrategy[strategy];
		const cartoesFidelidade = await modelStrategy(Model, find);
		
		cartoesFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
			res.status(200).send(cartoesFidelidade);

	}


	async show(req, res) {
		const cartaoFidelidade = await Model.find({ _id: req.params._id }).catch(e => console.log(e))
		cartoesFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
			res.status(200).send([cartoesFidelidade]);
	}



	async store(req, res) {

		const cartaoFidelidade = await Model.create(req.body);

		cartaoFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);

	}

	//update – Salva a atualização do dado
	async update(req, res) {

		const _idUsuario = mongoose.Types.ObjectId(req.body._idUsuario);
		const _idEstabelecimento = mongoose.Types.ObjectId(req.body._idEstabelecimento);
		const { ...doc } = req.body;
		let cartaoFidelidade;
		const length = await Model.countDocuments({ _idUsuario, _idEstabelecimento });
		length == 0 ? cartaoFidelidade = await Model.create(doc) : cartaoFidelidade = await Model.updateOne({ _idUsuario, _idEstabelecimento }, doc);

		cartaoFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);

	}

	//destroy – Remove o dado
	async destroy(req, res) {
		const { _id } = req.params; //mongoose.Types.ObjectId(
		const cartaoFidelidade = await Model.deleteOne({ _id });
		cartaoFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);

	}


}

module.exports = new CartaoFidelidade();