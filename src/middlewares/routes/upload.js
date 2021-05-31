const { check } = require('express-validator'),
    multer = require('multer'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt'),
    config = require('../multer')

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