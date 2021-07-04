const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt');




    // const pa


module.exports = {
    index: [
        Jwt.verify,
        check("_gateway").notEmpty(),
        expressValidation.validation
    ],
    show: [
        Jwt.verify,
        check("_id").notEmpty(),
        check("_gateway").notEmpty(),
        expressValidation.validation
    ],
    store: [
        Jwt.verify,
        check("_gateway").notEmpty(),
        // check("_idEstabelecimento").notEmpty(),
        // check("CardNumber").notEmpty(),
        // check("Holder").notEmpty(),
        // check("ExpirationDate").notEmpty().isLength({ max: 7 }).isLength({ min: 7 }),
        // check("SecurityCode").notEmpty().isLength({ max: 3 }).isLength({ min: 3 }),
        // check("Brand").notEmpty(),
        // check("Type").notEmpty(),
        // check("Amount").notEmpty(),
        expressValidation.validation
    ]
};