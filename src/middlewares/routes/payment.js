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
        check("_idUsuario").notEmpty(),
        check("_idEstabelecimento").notEmpty(),
        check("CardNumber").notEmpty(),
        check("Holder").notEmpty(),
        check("ExpirationDate").notEmpty().isLength({ max: 7 }).isLength({ min: 7 }),
        check("SecurityCode").notEmpty().isLength({ max: 3 }).isLength({ min: 3 }),
        check("Brand").notEmpty(),
        check("Type").notEmpty(),
        check("Amount").notEmpty(),
        expressValidation.validation
    ]
};