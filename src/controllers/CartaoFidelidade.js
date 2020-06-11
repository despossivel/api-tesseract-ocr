const mongoose = require('mongoose');
const ValidatorQuery = require('../utils/ValidatorQuery');

const ModelCartaoFidelidade = require('../models/CartaoFidelidade');
const ModelCartaoFidelidadeCPF = require('../models/CartaoFidelidadeCPF');

const CartaoFidelidadeStrategy = require('../controllers/CartaoFidelidadeStrategy')

class CartaoFidelidade {

	constructor() { }


	async index(req, res) {
		const query = req.query;
		const { strategy, ...find } = ValidatorQuery(query);

		const modelStrategy = CartaoFidelidadeStrategy[strategy];
		const cartoesFidelidade = await modelStrategy(find);

		cartoesFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum cartão fidelidade encontrado encontrado!" }] }) :
			res.status(200).send(cartoesFidelidade);

	}


	async show(req, res) {
		const { _id } = req.params._id;
		const query = req.query;
		const { strategy } = ValidatorQuery(query);
		const modelStrategy = CartaoFidelidadeStrategy[strategy];
		const cartaoFidelidade = await modelStrategy({ ..._id });

		cartaoFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum cartão fidelidade encontrado encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);
	}

	async store(req, res) {
		let strategy;
		const { _idUsuario, cpf } = req.body;

		_idUsuario ? strategy = 'estabelecimentosCreateCartaoFidelidade' : strategy = 'cpfCreateCartaoFidelidade';

		const modelStrategy = CartaoFidelidadeStrategy[strategy];
		const cartaoFidelidade = await modelStrategy(req.body);
		
		cartaoFidelidade.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel criar o cartão fidelidade!" }] }) :
			res.status(200).send(cartaoFidelidade);
	}

	//update – Salva a atualização do dado
	async update(req, res) {
		const query = req.query;
		const params = req.params;
		const doc = req.body;
		const { strategy, ...find } = ValidatorQuery({ ...params, ...query });

		const count = CartaoFidelidadeStrategy[`${strategy}CountDocument`];
		let cartaoFidelidade;


		const length = await count(find);

		const create = CartaoFidelidadeStrategy[`${strategy}CreateCartaoFidelidade`];
		const updateOne = CartaoFidelidadeStrategy[`${strategy}UpdateCartaoFidelidade`];
 
		length == 0 ?
			cartaoFidelidade = await create({ ...doc, ...find }) :
			cartaoFidelidade = await updateOne(find, doc);

		cartaoFidelidade.length == 0 ?
			res.status(422).send({ errors: [{ "msg": "Nenhum cartão fidelidade encontrado encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);

	}



	//destroy – Remove o dado
	async destroy(req, res) {
		const query = req.query;
		const params = req.params;
		const { strategy, ...find } = ValidatorQuery({ ...params, ...query });

		const deleteOne = CartaoFidelidadeStrategy[`${strategy}DestroyCartaoFidelidade`];
		const cartaoFidelidade = await deleteOne(find);

		cartaoFidelidade.length == 0 ?
			res.status(422).send({ errors: [{ "msg": "Nenhum cartão fidelidade encontrado encontrado!" }] }) :
			res.status(200).send(cartaoFidelidade);

	}


}

module.exports = new CartaoFidelidade();