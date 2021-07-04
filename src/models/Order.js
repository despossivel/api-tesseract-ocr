const mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId,
	Float = require('mongoose-float').loadType(mongoose);

const Order = new mongoose.Schema({
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
		}

	},
	pointAChecked: {
		type: Date,
		require: false
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
		}

	},
	pointBChecked: {
		type: Date,
		require: false
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
		returnPointA: {
			type: Boolean,
			require: true,
			setDefaultOnInsert: true
		}
	},
	pointCChecked: {
		type: Date,
		require: false
	},
	distancia: {
		text: {
			type: String,
			require: true
		},
		value: {
			type: Number,
			require: true
		}
	},
	tempo: {
		text: {
			type: String,
			require: true
		},
		value: {
			type: Number,
			require: true
		}
	},
	valor: {
		type: Float,
		require: true
	},
	agendadoPara: {
		type: Date,
		require: false
	},
	// 0 - aguardando pagamento
	// 1 - pagamento confirmado
	// 2 - aguardado aprovacao do admin
	// 3 - em andamento
	// 4 - concluida
	status: {
		type: Number,
		require: true,
		default: 0
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

module.exports = mongoose.model('Order', Order);