const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MetodosDePagamento = new mongoose.Schema({
	_idUsuario:{
		type: ObjectId,
		require:true
	},
	tipo:{
		type: String,
		require:true
	},
	titular:{
		type: String,
		require:true
	},
	numero:{
		type: String,
		require:true
	},
	mes:{
		type: String,
		require:true
	},
	ano:{
		type: String,
		require:true
	}
});

module.exports = () => mongoose.model('MetodosDePagamento', MetodosDePagamento);