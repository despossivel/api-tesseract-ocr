const { Router } = require('express');
const route = new Router();


const middleware = require('../middlewares/routes/upload');
const Uploads = require('../controllers/Uploads');

route.post('/upload/foto', middleware.foto, Uploads.foto)
route.post('/upload/logo', middleware.logo, Uploads.logo)

module.exports = route;