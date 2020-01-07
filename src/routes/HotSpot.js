const { check } = require('express-validator');

module.exports = (application) =>{
  	const HotSpot = new application.src.controllers.HotSpot(application);

  	application.get('/hotspots',[],(req, res) =>  HotSpot.index(req, res))

    application.get('/hotspot/:_id',[check('_id').notEmpty()], (req, res) =>  HotSpot.show(req, res))

    application.post('/hotspot/store', [
    	check('ssid').notEmpty(),
    	check('password').notEmpty(),
    	check('_idEstabelecimento').notEmpty(),
    	], (req, res) =>  HotSpot.store(req, res))

    application.put('/hotspot/update',[
        check('_id').notEmpty()
        ], (req, res) =>  HotSpot.update(req, res))

    application.delete('/hotspot/destroy',[
        check('_id').notEmpty()
        ], (req, res) =>  HotSpot.destroy(req, res))

}