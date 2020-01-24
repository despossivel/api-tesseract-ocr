const { check } = require('express-validator');

module.exports = (application) => {
   const Payments = new application.src.controllers.Payments(application);

   application.get('/payments', [
    application.src.middlewares.Jwt.verify,
    application.src.middlewares.expressValidation.validation
 ], (req, res) => Payments.index(req, res))

 application.get('/payment/:_id', [
    application.src.middlewares.Jwt.verify,
      check("_id").notEmpty()
    ], (req, res) => Payments.show(req, res))

 application.post('/payment/store', [
    application.src.middlewares.Jwt.verify,
		check("CardNumber").notEmpty(),
		check("Holder").notEmpty(),
		check("ExpirationDate").notEmpty().isLength({ max: 7 }).isLength({ min: 7 }),
		check("SecurityCode").notEmpty().isLength({ max: 3 }).isLength({ min: 3 }),
		check("Brand").notEmpty(),
  	   check("Type").notEmpty(),
      check("Amount").notEmpty(),
      application.src.middlewares.expressValidation.validation
 ], (req, res) => Payments.store(req, res))

 /*
 application.put('/payment/update', [
    application.src.middlewares.Jwt.verify,
   
 ], (req, res) => Payments.update(req, res))

 application.delete('/payment/destroy', [
    application.src.middlewares.Jwt.verify,
    
 ], (req, res) => Payments.destroy(req, res))
 */

}