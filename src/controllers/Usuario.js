const SMTP = require('../services/SMTP');
const blowfish = require('../utils/blowfish');
const Model = require('../models/Usuario');

class Usuario {


	async index(req, res) {
		const usuarios = await Model.find().catch(e => console.log(e))
		usuarios.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Nenhum usuario encontrado!" }] }) :
			res.status(200).send(usuarios);
	}

	async show(req, res) {
		const { _id } = req.params;
		const usuario = await Model.findById({ _id }).catch(e => console.log(e))
		usuario && usuario.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "Usuario não encontrado!" }] }) :
			res.status(200).send([usuario]);
	}


	async store(req, res) {
		const doc = req.body;
		const usuario = await Model.create(doc);
		const { _id } = usuario;

		await SMTP.send(doc.email, 'Confirmar conta no Pinpper', `Acesse o link para confirmar a sua conta
			${process.env.HOST}/public/confirmar/conta/${_id}`, ``).catch(e => console.error(e))
			
		// console.log(usuario)

		res.status(200).send(usuario);
	}

	async update(req, res) {
		const { _id } = req.params;
		const { senha, ...rest } = req.body;
		let doc = rest;

		/*
		if (senha) {
			const senhaEncrypt = blowfish.encrypt(senha)
			doc.senha = senhaEncrypt;
		}
		*/

		const usuario = await Model.updateOne({ _id }, doc);
		usuario.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar!" }] }) :
			res.status(200).send(usuario);

	}

	async destroy(req, res) {
		const { _id } = req.params;
		const usuario = await Model.deleteOne({ _id });
		usuario.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel remover o usuario!" }] }) :
			res.status(200).send(usuario);
	}

}

module.exports = new Usuario();