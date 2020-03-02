//const Treatment =  require('../utils/Treatment');
const Model = require('../models/Estabelecimento');



class Estabelecimento {

	constructor() {
		//this.application = application;
		//this.model = this.application.src.models.Estabelecimento;
	}



	async index(req, res) {
		try {

			const estabelecimentos = await Model.find({ ...req.query }).catch(e => console.log(e))

			estabelecimentos.length == 0 ?
				res.status(404).send({ errors: [{ "msg": "Nenhum estabelecimento encontrado!" }] }) :
				res.status(200).send(estabelecimentos.data);
 
		} catch (e) {
			throw e;
		}
	}

	async show(req, res) {
		const estabelecimento = await Model.find({ _id: req.params._id }).catch(e => console.log(e))

		estabelecimentos.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel encontrar o estabelecimento!" }] }) :
			res.status(200).send(estabelecimentos.data);
	}

	async store(req, res) {
		const estabelecimento = await Model.create(req.body);
		estabelecimentos.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel criar o estabelecimento!" }] }) :
			res.status(200).send(estabelecimentos.data);
	}

	async update(req, res) {
		const { _id } = req.params;
		const { ...doc } = req.body;
		const estabelecimento = await Model.updateOne({ _id }, doc);
		estabelecimentos.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel atualizar o estabelecimento!" }] }) :
			res.status(200).send(estabelecimentos.data);

	}

	async destroy(req, res) {
		const { _id } = req.params;
		const estabelecimento = await Model.deleteOne({ _id });
		estabelecimento.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel remover o estabelecimento!" }] }) :
			res.status(200).send(estabelecimento.data);
	}

}

module.exports = new Estabelecimento();