const mongoose = require('mongoose');

class Public {

    constructor(application) {
        this.application = application;
        this.model = this.application.src.models.Usuario;
        this.blowfish = this.application.src.utils.blowfish;
        this.SMTP = this.application.src.services.SMTP;
    }

    jsonResponse(data) {
        let response;
        data == null || data.length == 0
            ? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
            : response = { data, status: 200 }
        return response;
    }

    //confirmar conta
    async update(req, res) {
        let { _id } = req.params;
        _id = mongoose.Types.ObjectId(_id);
        const usuario = await this.model.updateOne({ _id }, { status: true });
        let response = usuario;
        response = this.jsonResponse(response);
        const { status, ..._response_ } = response;
        res.status(status).send(_response_.data);
    }

    //recuperar senha
    async show(req, res) {
        const { email } = req.params;
        const usuario = await this.model.find({ email, status: true }).catch(e => console.log(e))
        const [response] = usuario;
        let { senha } = response;
        senha = this.blowfish.decrypt(senha)
        await this.SMTP.send(email, 'Recuperação de senha',
            `Conseguimos recuperar sua senha, ela é ${senha}`, ``)
            .catch(e => console.error(e))
        res.status(200).send({ data: [{ "msg": "Email de recuperação foi enviado com sucesso!" }], status: 200 });
    }


}

module.exports = () => Public;