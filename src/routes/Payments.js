const { check } = require('express-validator');

module.exports = (application) => {
   const Payments = new application.src.controllers.Payments(application);

   application.get('/payments', application.src.middlewares.routes.payment.index, (req, res) => Payments.index(req, res))

   application.get('/payment/:_id', application.src.middlewares.routes.payment.show, (req, res) => Payments.show(req, res))

   application.post('/payment/store', application.src.middlewares.routes.payment.store, (req, res) => Payments.store(req, res))

   /*
   application.put('/payment/update', [
      application.src.middlewares.Jwt.verify,
     
   ], (req, res) => Payments.update(req, res))
  
   application.delete('/payment/destroy', [
      application.src.middlewares.Jwt.verify,
      
   ], (req, res) => Payments.destroy(req, res))
   */

}