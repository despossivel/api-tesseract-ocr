const { check } = require('express-validator');
const multer = require('multer');

const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');
const config = require('../multer')

module.exports = {
    foto: [
       // Jwt.verify,
       // expressValidation.validation,
        multer(config).single('foto')
    ],
    logo: [
       // Jwt.verify,
        //expressValidation.validation,
        multer(config).single('logo'),
    ],

};