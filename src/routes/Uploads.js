const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/upload'),
    Uploads = require('../controllers/Uploads');

route.post('/upload/foto', middleware.foto, Uploads.foto)
 

module.exports = route;