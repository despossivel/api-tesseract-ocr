const { check } = require('express-validator');


module.exports = (application) =>{
  	const Auth = new application.src.controllers.Auth(application);


    application.post('/auth', 
    			[check('email').isEmail(), check('password').isLength({ min: 5 })], 
    			(req, res) =>  Auth.show(req, res))

}