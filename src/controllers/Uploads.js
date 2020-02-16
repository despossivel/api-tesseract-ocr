class Uploads {

	constructor(application) {
		this.application = application;
		this.modelEstabelecimento = application.src.models.Estabelecimento;
		this.modelUsuario = application.src.models.Usuario;
	}

	jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
	}

	async foto(req, res) {
		const { _id } = req.body;
 
		const doc = {
			foto: req.file.filename
		};

		const usuario = await this.modelUsuario.updateOne({ _id }, doc);
		let response = usuario;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);


	}

	async logo(req, res) {
		const { _id } = req.body;
		const doc = {
			logo: req.file.filename
		};
		const estabelecimento = await this.modelEstabelecimento.updateOne({ _id }, doc);
		let response = estabelecimento;
		response = this.jsonResponse(response);
		const { status, ..._response_ } = response;
		res.status(status).send(_response_.data);

	}

}


module.exports = () => Uploads