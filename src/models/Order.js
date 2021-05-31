const mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

const Recompensa = new mongoose.Schema({
	_idEstabelecimento: {
		type: ObjectId,
		require: true
	},
	titulo: {
		type: String,
		require: true
	},
	descricao: {
		type: String,
		require: true
	},
	quantidadePontos: {
		type: Number,
		require: true
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