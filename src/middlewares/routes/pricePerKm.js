const { check } = require('express-validator');
const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');

module.exports = {
    index: [
        // Jwt.verify,
        expressValidation.validation
    ],
    show: [
        // Jwt.verify,
        check("_id").notEmpty(),
        expressValidation.validation
    ],
    store: [
        Jwt.verify,
        check('de').notEmpty(),
        check('ate').notEmpty(),
        check('price').notEmpty(),
        expressValidation.validation
    ],
    update: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ],
    destroy: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ]
};