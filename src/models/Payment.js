const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Payment = new mongoose.Schema({
        MerchantOrderId: {
                type: String,
                require: true
        },
        _idUsuario: {
                type: ObjectId,
                require: true
        },
        _idEstabelecimento: {
                type: ObjectId,
                require: true
        },
        Transation: {
                type: Object,
                required: true
        }
},
        {
                timestamps: true,
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
        }
);

module.exports = mongoose.model('Payment', Payment);