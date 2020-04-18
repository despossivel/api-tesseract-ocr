const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Licence = new mongoose.Schema({
    _idEstabelecimento: {
        type: ObjectId,
        require: true
    },
    status: {
        type: Boolean,
        required: true
    },
    venceEm: {
        type: Date,
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

module.exports = mongoose.model('Licence', Licence);