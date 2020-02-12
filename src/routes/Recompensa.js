const { check } = require('express-validator');

module.exports = (application) => {
    const Recompensa = new application.src.controllers.Recompensa(application);

    application.get('/recompensas', application.src.middlewares.routes.recompensa.index, (req, res) => Recompensa.index(req, res))

    application.get('/recompensa/:_id', application.src.middlewares.routes.recompensa.show, (req, res) => Recompensa.show(req, res))

    application.post('/recompensa/store', application.src.middlewares.routes.recompensa.store, (req, res) => Recompensa.store(req, res))

    application.put('/recompensa/update', application.src.middlewares.routes.recompensa.update, (req, res) => Recompensa.update(req, res))

    application.delete('/recompensa/destroy', application.src.middlewares.routes.recompensa.destroy, (req, res) => Recompensa.destroy(req, res))

}