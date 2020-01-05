const mongoose = require('mongoose');

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