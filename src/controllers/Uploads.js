const ModelEstabelecimento = require('../models/Estabelecimento');
const ModelUsuario = require('../models/Usuario');

class Uploads {

	async foto(req, res) {
		const { _id } = req.body;
		const doc = { foto: req.file.filename };
		const usuario = await ModelUsuario.updateOne({ _id }, doc);
		usuario.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel atualizar a foto do perfil!" }] }) :
			res.status(200).send(usuario);


	}

	async logo(req, res) {
		const { _id } = req.body;
		const doc = { logo: req.file.filename };
		const estabelecimento = await ModelEstabelecimento.updateOne({ _id }, doc);
		estabelecimento.n == 0 ?
			res.status(404).send({ errors: [{ "msg": "Não foi possivel atualizar a logo do estabelecimento!" }] }) :
			res.status(200).send(estabelecimento);

	}

}


module.exports = new Uploads()