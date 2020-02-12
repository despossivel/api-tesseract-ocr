const { check } = require('express-validator');
const expressValidation = require('../expressValidation')
const Model = require('../../models/Estabelecimento')
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
        check('nome').notEmpty(),
        check('nomeFantasia').notEmpty(),
        check('cnpj').notEmpty().custom(async (value) => {
            const cnpj = await Models.findOne({ cnpj: value })
            if (cnpj) {
                throw new Error('Cnpj já está em uso')
            }
        }),
        check('_idUsuario').notEmpty(),
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