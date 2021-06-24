const { check } = require('express-validator');
const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');

module.exports = {
    index: [
        Jwt.verify,
        expressValidation.validation
    ],
    show: [
        Jwt.verify,
        check("_id").notEmpty(),
        expressValidation.validation
    ],
    store: [
        Jwt.verify,
        check('_idUsuario').notEmpty(),
        check('endereco').notEmpty(),
        // check('complemento').notEmpty(),
        check('coordenadas').notEmpty(),
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