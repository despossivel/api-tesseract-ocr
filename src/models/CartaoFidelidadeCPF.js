const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CartaoFidelidadeCPF = new mongoose.Schema({
    _idEstabelecimento: {
        type: ObjectId,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    pontos: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true,
        setDefaultOnInsert: true
    }
}, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
});

module.exports = mongoose.model('CartaoFidelidadeCPF', CartaoFidelidadeCPF);