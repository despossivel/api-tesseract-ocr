const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt'),
    Model = require('../../models/Usuario');

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
    storeCpf: [
        //  Jwt.verify,
        check('nome').notEmpty(),
        check('email').notEmpty().isEmail().custom((value) => {
            return Model.findOne({ email: value }).then(email => {
                if (email) {
                    return Promise.reject('E-mail já está em uso')
                }
            })
        }),
        check('cpf').notEmpty().custom((value) => {
            return Model.findOne({ cpf: value }).then(cpf => {
                if (cpf) {
                    return Promise.reject('Cpf já está em uso')
                }
            })
        }),
        check('municipio').notEmpty(),
        check('estado').notEmpty().isLength({ max: 2 }),
        check('senha').notEmpty().isLength({ min: 5 }).withMessage('Sua senha deve ter pelo menos 5 caracteres'),
        check('telefone').notEmpty().custom((value) => {
            return Model.findOne({ telefone: value }).then(telefone => {
                if (telefone) {
                    return Promise.reject('Telefone já está em uso')
                }
            })
        }),
        expressValidation.validation
    ],
    storeCnpj: [
        //  Jwt.verify,
        check('nome').notEmpty(),
        check('email').notEmpty().isEmail().custom((value) => {
            return Model.findOne({ email: value }).then(email => {
                if (email) {
                    return Promise.reject('E-mail já está em uso')
                }
            })
        }),
        check('cnpj').notEmpty().custom((value) => {
            return Model.findOne({ cnpj: value }).then(cnpj => {
                if (cnpj) return Promise.reject('Cnpj já está em uso')

            })
        }),
        check('municipio').notEmpty(),
        check('estado').notEmpty().isLength({ max: 2 }),
        check('senha').notEmpty().isLength({ min: 5 }).withMessage('Sua senha deve ter pelo menos 5 caracteres'),
        check('telefone').notEmpty().custom((value) => {
            return Model.findOne({ telefone: value }).then(telefone => {
                if (telefone) {
                    return Promise.reject('Telefone já está em uso')
                }
            })
        }),
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