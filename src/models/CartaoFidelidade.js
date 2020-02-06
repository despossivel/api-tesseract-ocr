const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CartaoFidelidade = new mongoose.Schema({
	_idEstabelecimento: {
		type: ObjectId,
		require: true
	},
	_idUsuario: {
		type: ObjectId,
		require: true
	},
	pontos: {
		type: Number,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		setDefaultOnInsert: true
	}
}, {
	upsert: true,
	new: true,
	setDefaultsOnInsert: true
});

module.exports = () => mongoose.model('CartaoFidelidade', CartaoFidelidade);