const mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

const Recompensa = new mongoose.Schema({
	_idUsuario: {
		type: ObjectId,
		require: true
	},
	pointA: {
		type: String,
		require: true
	},
	pointAChecked: {
		type: Date,
		require: true
	},
	pointB: {
		type: String,
		require: true
	},
	pointBChecked: {
		type: Date,
		require: true
	},
	pointC: {
		type: String,
		require: true
	},
	pointCChecked: {
		type: Date,
		require: true
	},
	retorno: {
		type: Boolean,
		require: true,
		setDefaultOnInsert: false
	},
	fazer: {
		type: String,
		require: true
	},
	distancia: {
		type: String,
		require: true
	},
	tempo: {
		type: String,
		require: true
	},
	valor: {
		type: String,
		require: true
	},
	agendadoPara: {
		type: Date,
		require: false
	},
	status: {
		type: Boolean,
		require: true,
		setDefaultOnInsert: true
	},

},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

module.exports = mongoose.model('Recompensa', Recompensa);