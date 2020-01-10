 
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
    senha: {
        type: String,
        required: true
    },
    admin:{
        type:Boolean,
        required:false
    },
    telefone:{
        type:String,
        required:true
    },
    foto:{
        type:String,
        required:false
    }
})


module.exports =  () => mongoose.model('Usuario', Usuario)
 