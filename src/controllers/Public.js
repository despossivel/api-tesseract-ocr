const mongoose = require('mongoose');
const Model = require('../models/Usuario');
const blowfish = require('../utils/blowfish');
const SMTP = require('../services/SMTP');

class Public {

    async update(req, res) {
        let { _id } = req.params;
        _id = mongoose.Types.ObjectId(_id);
        const usuario = await Model.updateOne({ _id }, { status: true });
        usuario.length == 0 ?
            res.status(422).send({ errors: [{ "msg": "Não foi possivel ativar sua conta!" }] }) :
            // res.status(200).send(usuario.data);
            res.status(200).render('confirmar-email')
    }

    //recuperar senha
    async show(req, res) {
        const { email } = req.params;
        const usuario = await Model.find({ email, status: true }).catch(e => console.log(e))

        if (usuario.length == 0) res.status(404).send({ errors: [{ "msg": "Usuario não encontrado!" }] })

        const [response] = usuario;
        let { senha } = response;
        senha = blowfish.decrypt(senha)

        await SMTP.send(email, 'Recuperação de senha',
            `Conseguimos recuperar sua senha, ela é ${senha}`, ``)
            .catch(e => console.error(e))

        res.status(200).send({ data: [{ "msg": "Email de recuperação foi enviado com sucesso!" }] });
    }


}

module.exports = new Public();