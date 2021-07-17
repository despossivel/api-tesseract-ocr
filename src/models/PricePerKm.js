const mongoose = require('mongoose'),
    // ObjectId = mongoose.Schema.Types.ObjectId,
    Float = require('mongoose-float').loadType(mongoose);

 
const PricePerKm = new mongoose.Schema({
    de: {
        type: Number,
        require: true
    },
    ate: {
        type: Number,
        require: true
    },
    price: {
        type: Float,
        require: true
    }
},
    {
        timestamps: true,
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    });

module.exports = mongoose.model('PricePerKm', PricePerKm);