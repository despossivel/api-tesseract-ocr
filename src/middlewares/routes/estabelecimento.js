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
            return Model.findOne({ cnpj: value }).then(cnpj => {
                if (cnpj) {
                    return Promise.reject('Cnpj já está em uso')
                }
            })
        }),

        check('telefone').exists().notEmpty(),
        check('endereco').exists().notEmpty(),
        check('estado').exists().notEmpty(),
        check('municipio').exists().notEmpty(),
        check('_idUsuario').exists().notEmpty(),
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