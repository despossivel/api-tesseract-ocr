const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Hotspot = new mongoose.Schema({
	ssid:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	_idEstabelecimento:{
		type: ObjectId,
		require:true
	}
});

module.exports = () =>  mongoose.model('Hotspot', Hotspot);