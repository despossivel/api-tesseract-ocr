const { check } = require('express-validator');

module.exports = (application) => {
    const Recompensa = new application.src.controllers.Recompensa(application);

    application.get('/recompensas', [
        application.src.middlewares.Jwt.verify,
        application.src.middlewares.expressValidation.validation
    ], (req, res) => Recompensa.index(req, res))

    application.get('/recompensa/:_id', [application.src.middlewares.Jwt.verify,
    check('_id').notEmpty(),
    application.src.middlewares.expressValidation.validation
], (req, res) => Recompensa.show(req, res))

    application.post('/recompensa/store', [
        application.src.middlewares.Jwt.verify,
        check('_idEstabelecimento').notEmpty(),
        check('titulo').notEmpty(),
        check('descricao').notEmpty(),
        check('quantidadePontos').notEmpty(),
        application.src.middlewares.expressValidation.validation
    ], (req, res) => Recompensa.store(req, res))

    application.put('/recompensa/update', [
        application.src.middlewares.Jwt.verify,
        check('_id').notEmpty(),
        application.src.middlewares.expressValidation.validation
    ], (req, res) => Recompensa.update(req, res))

    application.delete('/recompensa/destroy', [
        application.src.middlewares.Jwt.verify,
        check('_id').notEmpty(),
        application.src.middlewares.expressValidation.validation
    ], (req, res) => Recompensa.destroy(req, res))

}