const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Licence = require('./Licence');
const Usuario = require('./Usuario');

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
		type: Number,
		required: true
	},
	municipio: {
		type: Number,
		required: true
	},
	logo: {
		type: String,
		require: false
	},
	coordinates: {
		type: [Number],
		required: false
	},
	_idUsuario: {
		type: ObjectId,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		default: true
	},
	licence: {
		type: Boolean,
		require: true,
		default: true
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


	
Estabelecimento.pre('save', function (next) {

	console.log(this)

	// Licence.create({
	// 	_idEstabelecimento: this._idEstabelecimento,
	// 	tempoEmDias: 30,
	// 	status: true
	// });

	// console.log({
	// 	_id: this._idUsuario
	// })

	// console.log({
	// 	adminIn: [this._idEstabelecimento]
	// })

	// Usuario.updateOne({
	// 	_id: this._idUsuario
	// }, {
	// 	adminIn: [this._idEstabelecimento]
	// });

	next();
})


Estabelecimento.virtual('logoUrl').get(function () {
	if (this.logo) {
		return `${process.env.HOST}/static/uploads/${encodeURIComponent(this.logo)}`
	}
})



module.exports = mongoose.model('Estabelecimento', Estabelecimento);