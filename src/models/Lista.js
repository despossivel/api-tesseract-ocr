const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


const Lista = new mongoose.Schema({
    idUsuario:{
        type: ObjectId,
        required: true
    },
    idEvento:{
        type: ObjectId,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    // timpestamp:true
})


module.exports = mongoose.model('Lista', Lista)