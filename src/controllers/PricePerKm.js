const mongoose = require('mongoose'),
    Model = require('../models/PricePerKm');

class PricePerKm {

    async index(req, res) {
        let find = req.query;

        find._idUsuario ?
            find._idUsuario = mongoose.Types.ObjectId(find._idUsuario)
            : find = {};

        const pricePerKm = await Model.find(find).catch(e => console.log(e))

        pricePerKm.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "Nenhuma regra de valor por km encontrada no momento!" }] }) :
            res.status(200).send(pricePerKm);

    }

    async show(req, res) {
        const { _id } = req.params;
        const pricePerKm = await Model.findById({ _id }).catch(e => console.log(e))
        pricePerKm.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "Regra de valor por km não encontrada!" }] }) :
            res.status(200).send([pricePerKm]);
    }

    async store(req, res) {
        const pricePerKm = await Model.create({ ...req.body });
        pricePerKm.length == 0 ?
            res.status(404).send({ errors: [{ "msg": "Não foi possiel criar a esta regra de valor por km!" }] }) :
            res.status(200).send(pricePerKm);
    }

    async update(req, res) {
        const { _id } = req.params;
        const doc = req.body;
        const pricePerKm = await Model.updateOne({ _id }, doc);
        pricePerKm.n == 0 ?
            res.status(422).send({ errors: [{ "msg": "Não foi possivel atualizar esta regra de valor por km!" }] }) :
            res.status(200).send(pricePerKm);
    }

    async destroy(req, res) {
        const { _id } = req.params;
        const pricePerKm = await Model.deleteOne({ _id });
        pricePerKm.n == 0 ?
            res.status(422).send({ errors: [{ "msg": "Não foi possivel remover esta regra de valor por km!" }] }) :
            res.status(200).send(pricePerKm);
    }

}



module.exports = new PricePerKm();