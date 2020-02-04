const { check } = require('express-validator');

module.exports = (application) => {
    const Public = new application.src.controllers.Public(application);

    application.get('/public/confirmar/conta/:_id', [
        check('_id').exists().notEmpty()
    ], (req, res) => Public.update(req, res))


    application.get('/public/esqueci/minha/senha/:email', [
        check('email').exists().notEmpty()
    ], (req, res) => Public.show(req, res))



}