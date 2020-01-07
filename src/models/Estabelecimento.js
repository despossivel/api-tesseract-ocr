const mongoose = require('mongoose');

const Estabelecimento = new mongoose.Schema({
	nome:{
		type:String,
		require:true
	},
	nomeFantasia:{
		type:String,
		require:true
	},
	cnpj:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	senha:{
		type:String,
		require:true
	},
	status:{
		type:Boolean,
		require:true,
		setDefaultsOnInsert:true
	},
});



module.exports = () =>  mongoose.model('Estabelecimento', Estabelecimento);