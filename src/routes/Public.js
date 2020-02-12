const { check } = require('express-validator');

module.exports = (application) => {
    const Public = new application.src.controllers.Public(application);

    application.get('/public/confirmar/conta/:_id', application.src.middlewares.routes.public.update, (req, res) => Public.update(req, res))


    application.get('/public/esqueci/minha/senha/:email', application.src.middlewares.routes.public.show, (req, res) => Public.show(req, res))



}