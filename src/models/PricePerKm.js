const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;




const getPrice = num => (num / 100).toFixed(2);

const setPrice = num => parseFloat(num) * 100;


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
        type: mongoose.Schema.Types.Decimal128,
        get: getPrice,
        set: setPrice,
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