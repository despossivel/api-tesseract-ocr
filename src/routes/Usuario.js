const { check } = require('express-validator');

module.exports = (application) =>{
  	const Usuario = new application.src.controllers.Usuario(application);

  	application.get('/usuarios',[],(req, res) =>  Usuario.index(req, res))

    application.get('/usuario/:_id',[check('_id').notEmpty()], (req, res) =>  Usuario.show(req, res))

    application.post('/usuario/store', [
		check('nome').notEmpty(),
    	check('usuario').notEmpty(),
    	check('email').notEmpty().isEmail(),
    	check('cidade').notEmpty(),
    	check('estado').notEmpty(),
    	check('senha').notEmpty(),
    	check('telefone').notEmpty()
    	], (req, res) =>  Usuario.store(req, res))

    application.put('/usuario/update',[
        check('_id').notEmpty()
        ], (req, res) =>  Usuario.update(req, res))

    application.delete('/usuario/destroy',[
        check('_id').notEmpty()
        ], (req, res) =>  Usuario.destroy(req, res))

}