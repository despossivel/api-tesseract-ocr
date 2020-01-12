const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Payment = new mongoose.Schema({
	MerchantOrderId:{
		type:String,
		require:true
	},
	_idUsuario:{
		type: ObjectId,
		require:true
    },
    Customer:{
            type:Object,
            required:true
    },
    Customer:{
            type:Object,
            required:true
    },
    Payment:{
        type:Object,
        required:true
    }
});

module.exports = () =>  mongoose.model('Payment', Payment);