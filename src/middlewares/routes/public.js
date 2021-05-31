const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt');

module.exports = {
    // index: [
    //     Jwt.verify,
    //     expressValidation.validation
    // ],
    show: [
        check('email').exists().notEmpty(),
        expressValidation.validation
    ],
    // store: [

    // ],
    update: [
        // Jwt.verify,
        check('_id').exists().notEmpty(),
        expressValidation.validation
        // expressValidation.validation
    ],
    // destroy: [
    //     Jwt.verify,
    //     check('_id').notEmpty(),
    //     expressValidation.validation
    // ]
};