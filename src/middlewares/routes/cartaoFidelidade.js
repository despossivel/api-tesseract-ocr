const { check } = require('express-validator');
const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');

module.exports = {
    index: [
        Jwt.verify
    ],
    show: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ],
    store: [
        Jwt.verify,
        check('_idEstabelecimento').notEmpty(),
        check('_idUsuario').notEmpty(),
        check('pontos').notEmpty(),
        expressValidation.validation
    ],
    update: [
        Jwt.verify,
        check('_idEstabelecimento').notEmpty(),
        check('_idUsuario').notEmpty(),
        check('pontos').notEmpty(),
        expressValidation.validation
    ],
    destroy: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ]
};