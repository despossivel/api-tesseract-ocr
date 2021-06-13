const mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

const Recompensa = new mongoose.Schema({
	_idUsuario: {
		type: ObjectId,
		require: true
	},
	pointA: {
		endereco: {
			type: String,
			require: true
		},
		fazer: {
			type: String,
			require: true
		},
		complemento: {
			type: String,
			require: true
		}

	},
	pointAChecked: {
		type: Date,
		require: true
	},
	pointB: {
		endereco: {
			type: String,
			require: true
		},
		fazer: {
			type: String,
			require: true
		},
		complemento: {
			type: String,
			require: true
		}

	},
	pointBChecked: {
		type: Date,
		require: true
	},
	pointC: {
		endereco: {
			type: String,
			require: true
		},
		fazer: {
			type: String,
			require: true
		},
		complemento: {
			type: String,
			require: true
		},
		returnPointA: {
			type: Boolean,
			require: true,
			setDefaultOnInsert: true
		}
	},
	pointCChecked: {
		type: Date,
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
	// 0 - aguardando analise
	// 1 - aprovado
	// 2 - em andamento
	// 3 - concluida
	status: {
		type: Boolean,
		require: true,
		setDefaultOnInsert: true
	},
	paymentId: {
		type: String,
		require: false
	},
},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

module.exports = mongoose.model('Recompensa', Recompensa);