const mongoose = require('mongoose');

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
        type: DateTime,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    tipo:{
        type: Interger, //com nome na lista
                        //com nome na lista sujeito a aprovação
                        //aberto
                        //com ingresso
        required: true
    },
    idPromotor:{
        type:ObjectId,
        required:true
    },
    // timpestamp:true
})


module.exports = mongoose.model('Evento', Evento)