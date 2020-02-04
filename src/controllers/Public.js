const mongoose = require('mongoose');

class Public {

    constructor(application) {
        this.application = application;
        this.model = this.application.src.models.Usuario;
    }

    jsonResponse(data) {
        let response;
        data == null || data.length == 0
            ? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
            : response = { data, status: 200 }
        return response;
    }


    async update(req, res) {

        const _id = mongoose.Types.ObjectId(req.params._id);
        const usuario = await this.model.updateOne({ _id }, { status: true });
        let response = usuario;
        response = this.jsonResponse(response);
        const { status, ..._response_ } = response;
        res.status(status).send(_response_.data);

    }

}

module.exports = () => Public;