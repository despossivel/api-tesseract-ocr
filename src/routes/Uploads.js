const { check } = require('express-validator');
const multer = require('multer');
const config = require('../middlewares/multer')

module.exports = (application) => {

    const Uploads = new application.src.controllers.Uploads(application)

    application.post('/upload/foto', [
        application.src.middlewares.routes.upload.foto,
    ], (req, res) => Uploads.foto(req, res))

    application.post('/upload/logo',
        application.src.middlewares.routes.upload.logo
        , (req, res) => Uploads.logo(req, res))

}