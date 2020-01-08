const { check } = require('express-validator');

module.exports = (application) =>{
  	const HotSpot = new application.src.controllers.HotSpot(application);

  	application.get('/hotspots',[
       application.src.middlewares.Jwt.verify
      ],(req, res) =>  HotSpot.index(req, res))

    application.get('/hotspot/:_id',[
       application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()], (req, res) =>  HotSpot.show(req, res))

    application.post('/hotspot/store', [
       application.src.middlewares.Jwt.verify,
    	check('ssid').notEmpty(),
    	check('password').notEmpty(),
    	check('_idUsuario').notEmpty(),
    	], (req, res) =>  HotSpot.store(req, res))

    application.put('/hotspot/update',[
       application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()
        ], (req, res) =>  HotSpot.update(req, res))

    application.delete('/hotspot/destroy',[
       application.src.middlewares.Jwt.verify,
        check('_id').notEmpty()
        ], (req, res) =>  HotSpot.destroy(req, res))

}