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
        check('pointA').notEmpty(),
        check('pointB').notEmpty(),
        check('pointC').notEmpty(),
        check('pointC').notEmpty(),
        check('retorno').notEmpty(),
        check('fazer').notEmpty(),
        // check('agendadoPara').notEmpty(),
        check('distancia').notEmpty(),
        check('tempo').notEmpty(),
        check('valor').notEmpty(),
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