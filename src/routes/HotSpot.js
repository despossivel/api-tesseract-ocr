const { check } = require('express-validator');

module.exports = (application) => {
   const HotSpot = new application.src.controllers.HotSpot(application);

   application.get('/hotspots', [
      application.src.middlewares.Jwt.verify,
      application.src.middlewares.expressValidation.validation
   ], (req, res) => HotSpot.index(req, res))

   application.get('/hotspot/:_id', [
      application.src.middlewares.Jwt.verify,
      check('_id').notEmpty(),
      application.src.middlewares.expressValidation.validation
   ], (req, res) => HotSpot.show(req, res))

   application.post('/hotspot/store', [
      application.src.middlewares.Jwt.verify,
      check('ssid').notEmpty(),
      check('password').notEmpty(),
      check('_idUsuario').notEmpty(),
      application.src.middlewares.expressValidation.validation
   ], (req, res) => HotSpot.store(req, res))

   application.put('/hotspot/update', [
      application.src.middlewares.Jwt.verify,
      check('_id').notEmpty(),
      application.src.middlewares.expressValidation.validation
   ], (req, res) => HotSpot.update(req, res))

   application.delete('/hotspot/destroy', [
      application.src.middlewares.Jwt.verify,
      check('_id').notEmpty(),
      application.src.middlewares.expressValidation.validation
   ], (req, res) => HotSpot.destroy(req, res))

}