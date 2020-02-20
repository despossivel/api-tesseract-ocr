const { check } = require('express-validator');
const multer = require('multer');

const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');
const config = require('../multer')

module.exports = {
    foto: [
        Jwt.verify,
        // check('_id').exists().notEmpty(),
        multer(config).single('foto'),
        expressValidation.validation
    ],
    logo: [
        Jwt.verify,
        // check('_id').exists().notEmpty(),
        multer(config).single('logo'),
        expressValidation.validation
    ],
};