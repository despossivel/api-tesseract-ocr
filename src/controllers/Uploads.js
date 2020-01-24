class Uploads {

	constructor(application) {
		this.application = application;
		this.modelEstabelecimento = application.src.models.Estabelecimento;
		this.modelUsuario = application.src.models.Usuario;
	}

    async foto(req,res){
 
        //this.application.src.utils.validationResult(req, res); 
		const _id = req.body._id;
		let doc = {
			foto:req.file.filename
		}; 
		const usuario = await this.modelUsuario.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [usuario])
     
    }

    async logo(req, res){
        //this.application.src.utils.validationResult(req, res); 
		const _id = req.body._id;
		let doc = {
			logo:req.file.filename
		}; 
		const estabelecimento = await this.modelEstabelecimento.updateOne({ _id }, doc);
		const response = this.application.src.utils.Response
		response.send(res, [estabelecimento])

    }

}


module.exports = () => Uploads