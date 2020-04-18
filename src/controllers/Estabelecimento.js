//const Treatment =  require('../utils/Treatment');
const Model = require('../models/Estabelecimento');

const GooglePlaces = require('../services/GooglePlaces')


class Estabelecimento {

	constructor() { }

	async index(req, res) {
		try {

			const estabelecimentos = await Model.find({ ...req.query }).catch(e => console.log(e))

			estabelecimentos.length == 0 ?
				res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
				res.status(200).send(estabelecimentos);

		} catch (e) {
			throw e;
		}
	}

	async show(req, res) {
		const estabelecimento = await Model.find({ _id: req.params._id }).catch(e => console.log(e))
		const [estabelecimentoUnique] = estabelecimento;
		const estabelecimentoFinal = { ...estabelecimentoUnique._doc, details: {} };

		if (estabelecimento.length > 0) {
			const { placeId } = estabelecimento[0];
			const detailsPlace = await GooglePlaces.details(placeId)

			estabelecimentoFinal.details = detailsPlace;
		}

		estabelecimento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o estabelecimento!" }] }) :
			res.status(200).send([estabelecimentoFinal]);
	}

	async store(req, res) {
		const estabelecimento = await Model.create(req.body);
		estabelecimento.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel criar o estabelecimento!" }] }) :
			res.status(200).send(estabelecimento);
	}

	async update(req, res) {
		const { _id } = req.params;
		const { ...doc } = req.body;
		const estabelecimento = await Model.updateOne({ _id }, doc);
		estabelecimento.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar o estabelecimento!" }] }) :
			res.status(200).send(estabelecimento);

	}

	async destroy(req, res) {
		const { _id } = req.params;
		const estabelecimento = await Model.deleteOne({ _id });
		estabelecimento.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel remover o estabelecimento!" }] }) :
			res.status(200).send(estabelecimento);
	}

}

module.exports = new Estabelecimento();