const mongoose = require('mongoose');

const Estabelecimento = new mongoose.Schema({
	nome: {
		type: String,
		require: true
	},
	nomeFantasia: {
		type: String,
		require: true
	},
	cnpj: {
		type: String,
		require: true
	},
	telefone: {
		type: String,
		required: true
	},
	endereco: {
		type: String,
		required: true
	},
	estado: {
		type: String,
		required: true
	},
	cidade: {
		type: String,
		required: true
	},
	logo: {
		type: String,
		require: false
	},
	coordinates: {
		type: [Number],
		required: true
	},
	_idUsuario: {
		type: String,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		setDefaultsOnInsert: true
	},

},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

Estabelecimento.virtual('logoUrl').get(function () {
	const url = process.env.URL || process.env.LOCAL
	return `http://${url}/static/${encodeURIComponent(this.logo)}`
})



module.exports = () => mongoose.model('Estabelecimento', Estabelecimento);