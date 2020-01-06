 
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Lista = new mongoose.Schema({
    status:{
        type: Boolean,
        required: true
    },
     _idUsuario: {
        type:ObjectId,
        required:true
    },
     _idEvento: {
        type:ObjectId,
        required:true
    }
    // timpestamp:truez
})


module.exports =  () => mongoose.model('Lista', Lista)
 