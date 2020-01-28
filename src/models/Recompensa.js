const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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

});

module.exports = () => mongoose.model('Recompensa', Recompensa);