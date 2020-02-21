const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
		type: ObjectId,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		default: false
	},
	licence: {
		type: Boolean,
		require: true,
		default: false
	}
},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});



Estabelecimento.virtual('logoUrl').get(function () {
	return `http://${process.env.NODE_ENV == 'heroku' ? process.env.HEROKU : process.env.DEV}/static/uploads/${encodeURIComponent(this.foto)}`
})



module.exports = () => mongoose.model('Estabelecimento', Estabelecimento);