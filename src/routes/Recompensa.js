const { Route } = require('express');
const route = new Route();

const middleware = require('../middlewares/routes/recompensa');
const Recompensa = require('../controllers/Recompensa');

route.get('/recompensas', middleware.index, Recompensa.index)
route.get('/recompensa/:_id', middleware.show, Recompensa.show)
route.post('/recompensa', middleware.store, Recompensa.store)
route.put('/recompensa/:_id', middleware.update, Recompensa.update)
route.delete('/recompensa/:_id', middleware.destroy, Recompensa.destroy)

module.exports = route;