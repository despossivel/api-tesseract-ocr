const { check } = require('express-validator');
const multer = require('multer');

module.exports = (application) => {

       const Uploads = new application.src.controllers.Uploads(application)

   application.post('/upload/foto',
        application.src.middlewares.Jwt.verify,
       // check('foto').notEmpty(),
       // check('_id').notEmpty(),
        multer(application.src.middlewares.multer).single('foto'),
        (req, res) => Uploads.foto(req, res))

    application.post('/upload/logo',
        application.src.middlewares.Jwt.verify,
       // check('logo').notEmpty(),
      //  check('_id').exists().notEmpty(),
        multer(application.src.middlewares.multer).single('logo'),
        (req, res) => Uploads.logo(req, res))

}