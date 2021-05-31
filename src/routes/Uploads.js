const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/upload'),
    Uploads = require('../controllers/Uploads');

route.post('/upload/foto', middleware.foto, Uploads.foto)
route.post('/upload/logo', middleware.logo, Uploads.logo)

module.exports = route;