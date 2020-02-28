const { check } = require('express-validator');
const expressValidation = require('../expressValidation')
const Jwt = require('../Jwt');
const Model = require('../../models/Usuario')

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
        //  Jwt.verify,
        check('nome').notEmpty(),
        // check('usuario').notEmpty().custom((value) => {
        //     return Model.findOne({ usuario: value }).then(usuario => {
        //         if (usuario) {
        //             return Promise.reject('Nome de usuário já está em uso')
        //         }
        //     })
        // }),
        // check('email').notEmpty().isEmail().custom((value) => {
        //     return Model.findOne({ email: value }).then(email => {
        //         if (email) {
        //             return Promise.reject('E-mail já está em uso')
        //         }
        //     })
        // }),
        check('municipio').notEmpty(),
        check('estado').notEmpty().isLength({ max: 2 }),
        check('senha').notEmpty().isLength({ min: 5 }).withMessage('Sua senha deve ter pelo menos 5 caracteres'),
        // check('telefone').notEmpty().custom((value) => {
        //     return Model.findOne({ telefone: value }).then(telefone => {
        //         if (telefone) {
        //             return Promise.reject('Telefone já está em uso')
        //         }
        //     })
        // }),
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