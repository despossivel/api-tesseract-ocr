const { check } = require('express-validator');

module.exports = (application) => {
	const Usuario = new application.src.controllers.Usuario(application);

	application.get('/usuarios', [
		//application.src.middlewares.Jwt.verify,
		application.src.middlewares.expressValidation.validation
	], (req, res) => Usuario.index(req, res))

	application.get('/usuario/:_id', [application.src.middlewares.Jwt.verify,
	check('_id').notEmpty(),
	application.src.middlewares.expressValidation.validation
], (req, res) => Usuario.show(req, res))

	application.post('/usuario/store', [
		//application.src.middlewares.Jwt.verify,
		check('nome').notEmpty(),
		check('usuario').notEmpty().custom((value) => {
			return application.src.models.Usuario.findOne({ usuario: value }).then(usuario=>{
				 if(usuario){
					 return Promise.reject('Nome de usuário já está em uso')
				 }
			 })
	   }),
		check('email').notEmpty().isEmail().custom((value) => {
			 return application.src.models.Usuario.findOne({ email: value }).then(email=>{
				  if(email){
					  return Promise.reject('E-mail já está em uso')
				  }
			  })
		}),
		check('municipio').notEmpty(),
		check('estado').notEmpty().isLength({ max: 2 }),
		check('senha').notEmpty().isLength({ min: 5 }).withMessage('Sua senha deve ter pelo menos 5 caracteres'),
		check('telefone').notEmpty().custom((value) => {
			return application.src.models.Usuario.findOne({ telefone: value }).then(telefone=>{
				 if(telefone){
					 return Promise.reject('Telefone já está em uso')
				 }
			 })
	   }),
	   application.src.middlewares.expressValidation.validation
	], (req, res) => Usuario.store(req, res))

	application.put('/usuario/update', [
		application.src.middlewares.Jwt.verify,
		check('_id').notEmpty(),
		application.src.middlewares.expressValidation.validation
	], (req, res) => Usuario.update(req, res))

	application.delete('/usuario/destroy', [
		//application.src.middlewares.Jwt.verify,
		check('_id').notEmpty(),
		application.src.middlewares.expressValidation.validation
	], (req, res) => Usuario.destroy(req, res))

}