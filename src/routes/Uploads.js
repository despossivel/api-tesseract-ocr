const { check } = require('express-validator');
const multer = require('multer');

module.exports = (application) => {
 
    application.post('/upload/logo',
        application.src.middlewares.Jwt.verify,
        check('logo').notEmpty(),
        check('_idEstabelecimento').exists().notEmpty(),
        multer(application.src.middlewares.multer).single('logo'),
        (req, res) => application.src.controllers.Uploads.estabelecimento(req, res))


    application.post('/upload/foto',
        application.src.middlewares.Jwt.verify,
        check('foto').notEmpty(),
        check('_idUsuario').notEmpty(),
        multer(application.src.middlewares.multer).single('foto'),
        (req, res) => application.src.controllers.Uploads.usuario(req, res))

}