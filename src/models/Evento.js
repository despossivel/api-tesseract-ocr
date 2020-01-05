const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Evento = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    faixaEtaria:{
        type: String,
        required: true
    },
    dataHora:{
        type: Date,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    tipo:{
        type: Number, //com nome na lista
                        //com nome na lista sujeito a aprovação
                        //aberto
                        //com ingresso
        required: true
    },
    idPromotor: Schema.Types.ObjectId
    // timpestamp:true
})


module.exports = mongoose.model('Evento', Evento)