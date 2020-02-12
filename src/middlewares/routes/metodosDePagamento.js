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
        check('cvv').notEmpty().isLength({ min: 3, max:3 }),
        check('_id').notEmpty(),
        expressValidation.validation
    ],
    store: [
        Jwt.verify,
        check('_idUsuario').notEmpty(),
        check('tipo').notEmpty(),
        check('titular').notEmpty().isLength({ min: 5 }),
        check('numero').notEmpty().isLength({ min: 14, max:16 }),
        check('mes').notEmpty().isLength({ min: 1, max:2 }),
        check('ano').notEmpty().isLength({ min: 2, max:2 }),
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