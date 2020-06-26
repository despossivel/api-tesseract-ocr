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
	setDefaultsOnInsert: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
});


// CartaoFidelidade.virtual('logoUrl').get(function () {
// 	console.log(this)

// 	if (this.estabelecimento.length > 0) {
// 		const [estabelecimentoOne] = this.estabelecimento;
// 		const {
// 			logo
// 		} = estabelecimentoOne;

// 		return `${process.env.HOST}/static/uploads/${encodeURIComponent(logo)}`
// 	}
// })

module.exports = mongoose.model('CartaoFidelidade', CartaoFidelidade);