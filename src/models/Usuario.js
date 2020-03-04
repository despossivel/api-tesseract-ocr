const mongoose = require('mongoose');
const blowfish = require('../utils/blowfish');

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
    cpf: {
        type: String,
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


Usuario.pre('save', function (next) {
    this.senha = blowfish.encrypt(this.senha);
    next();
})

Usuario.virtual('fotoUrl').get(function () {
    if (this.foto) {
        return `http://${process.env.NODE_ENV == 'heroku' ? process.env.HEROKU : process.env.DEV}/static/uploads/${encodeURIComponent(this.foto)}`
    }
})


module.exports = mongoose.model('Usuario', Usuario)
