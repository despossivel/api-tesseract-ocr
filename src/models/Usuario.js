 
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
},
{
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
})

Usuario.virtual('fotoUrl').get(function(){
	const url = process.env.URL || process.env.LOCAL
    return `http://${url}/static/${encodeURIComponent(this.logo)}`
})


module.exports =  () => mongoose.model('Usuario', Usuario)
 