const mongoose = require('mongoose'),
    Model = require('../models/Address');

class Address {

    async index(req, res) {
        let find = req.query;
 
        find._idUsuario ?
            find._idUsuario = mongoose.Types.ObjectId(find._idUsuario)
            : find = {};
 
        const address = await Model.find(find).catch(e => console.log(e))

        address.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "Nenhuma address encontrada no momento!" }] }) :
            res.status(200).send(address);

    }

    async show(req, res) {
        const { _id } = req.params;
        const address = await Model.findById({ _id }).catch(e => console.log(e))
        address.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "address não encontrada!" }] }) :
            res.status(200).send([address]);
    }

    async store(req, res) {
        const address = await Model.create({ ...req.body });
        address.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "Não foi possiel criar a address!" }] }) :
            res.status(200).send(address);
    }

    async update(req, res) {
        const { _id } = req.params;
        const doc = req.body;
        const address = await Model.updateOne({ _id }, doc);
        address.n == 0 ?
            res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar a address!" }] }) :
            res.status(200).send(address);
    }

    async destroy(req, res) {
        const { _id } = req.params;
        const address = await Model.deleteOne({ _id });
        address.n == 0 ?
            res.status(422).send({ errors: [{ "msg": "Não foi possivel remover a address" }] }) :
            res.status(200).send(address);
    }

}



module.exports = new Address();