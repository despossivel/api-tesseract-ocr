const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/upload'),
    Uploads = require('../controllers/Uploads');

route.post('/upload/image', middleware.image, Uploads.image)
 

module.exports = route;