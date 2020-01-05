const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    cidade: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        required:true,
        setDefaultsOnInsert:true
    },
    // timestamps: true
})


module.exports = mongoose.model('Usuario', Usuario)