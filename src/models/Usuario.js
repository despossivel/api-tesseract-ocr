
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
    email: {
        type: String,
        required: true
    },
    municipio: {
        type: Number,
        required: true
    },
    estado: {
        type: Number,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    adminIn: {
        type: Array
    },
    foto: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        setDefaultOnInsert: false
    }
},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    })

Usuario.virtual('fotoUrl').get(function () {
    const url = process.env.URL || process.env.LOCAL
    return `http://${process.env.HEROKU}/static/${encodeURIComponent(this.foto)}`
})


module.exports = () => mongoose.model('Usuario', Usuario)
