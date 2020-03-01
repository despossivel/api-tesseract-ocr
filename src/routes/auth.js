const { Router } = require('express')
const route = new Router();

const middleware = require('../middlewares/routes/auth');
const Auth = require('../controllers/Auth');

//module.exports = (application) => {
//	const Auth = new application.src.controllers.Auth(application);

route.post('/auth', middleware.index, Auth.show)

//}

module.exports = route;