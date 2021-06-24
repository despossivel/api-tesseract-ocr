const mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

const Address = new mongoose.Schema({
	_idUsuario: {
		type: ObjectId,
		require: true
	},
	endereco: {
		type: String,
		require: true
	},
	coordenadas: {
		lat: {
			type: String,
			require: true
		},
		lng: {
			type: String,
			require: true
		}
	},
	complemento: {
		type: String,
		require: false
	},
	status: {
		type: Boolean,
		require: true,
		setDefaultOnInsert: true
	}
},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

module.exports = mongoose.model('Address', Address);