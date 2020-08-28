const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Licence = require('./Licence');
// const Usuario = require('./Usuario');

const GooglePlaces = require('../services/GooglePlaces')


const { parseISO, isAfter, addDays } = require('date-fns')
// const { ptBR } = require('date-fns/locale')

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
	placeId: {
		type: String,
		require: false
	},
	geometry: {
		type: Object,
		required: false
	},
	valorPonto: {
		type: Number,
		required: false,
		default: 1
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


// Estabelecimento.pre('findOne', async function (next) {
// 	console.log(this)
// 	next()
// })

Estabelecimento.pre('updateOne', async function (next) {
	const {
		_id: _idEstabelecimento
	} = this._conditions;
	const {
		licence
	} = this._update;

	if (licence) {

		const licenceCurrent = await Licence.findOne({
			_idEstabelecimento
		})

		if (licenceCurrent) {

			await Licence.updateOne({
				_idEstabelecimento
			}, {
				status: true,
				venceEm: addDays(new Date(), 30)
			});


		} else {
			await Licence.create({
				_idEstabelecimento,
				status: true,
				venceEm: addDays(new Date(), 30)
			})
		}

	}

	next();
})

Estabelecimento.pre('save', async function (next) {
	const {
		place_id,
		geometry
	} = await GooglePlaces.search(this.nomeFantasia,
		'-8.0297299,-50.0313114',
		'500')

	if (place_id) {
		this.placeId = place_id;
		this.geometry = geometry;
	}

	next();
})


Estabelecimento.virtual('logoUrl').get(function () {

	// console.log(this)

	if (this.logo) {
		return `${process.env.HOST}/static/uploads/${encodeURIComponent(this.logo)}`
	}
})



module.exports = mongoose.model('Estabelecimento', Estabelecimento);