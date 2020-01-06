 
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    _idPromoter: {
        type:ObjectId,
        required:true
    }
    // timpestamp:true
})


module.exports = () => mongoose.model('Evento', Evento)
 