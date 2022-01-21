const { check } = require('express-validator'),
    multer = require('multer'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt'),
    config = require('../multer')

module.exports = {
    image: [
        // Jwt.verify,
        // check('_id').exists().notEmpty(),
        multer(config).single('image'),
        expressValidation.validation
    ]
};