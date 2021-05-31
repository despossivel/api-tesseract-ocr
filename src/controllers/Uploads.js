const ModelUsuario = require('../models/Usuario');

class Uploads {

	async foto(req, res) {
		const { _id } = req.body,
			doc = { foto: req.file.filename },
			usuario = await ModelUsuario.updateOne({ _id }, doc);

		usuario.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar a foto do perfil!" }] }) :
			res.status(200).send(usuario);

	}

	async logo(req, res) {
		const { _id } = req.body,
			doc = { logo: req.file.filename };
		// 	estabelecimento = await ModelEstabelecimento.updateOne({ _id }, doc);
			
		// estabelecimento.n == 0 ?
		// 	res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar a logo do estabelecimento!" }] }) :
		// 	res.status(200).send(estabelecimento);

	}

}


module.exports = new Uploads()