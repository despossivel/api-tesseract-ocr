const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/auth'),
    Auth = require('../controllers/Auth');

route.post('/auth', middleware.index, Auth.show)

module.exports = route;