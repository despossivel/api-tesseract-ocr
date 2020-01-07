const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CupomDesconto = new mongoose.Schema({
	_idEstabelecimento:{
		type: ObjectId,
		require:true
	},
	valor:{
		type: Number,
		require:true
	},
	validade:{
		type: Date,
		require:true
	}
});

module.exports = () =>  mongoose.model('CupomDesconto', CupomDesconto);