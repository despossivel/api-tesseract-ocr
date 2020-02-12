module.exports = (application) => {
	const Auth = new application.src.controllers.Auth(application);

	application.post('/auth',
		application.src.middlewares.routes.auth.index,
		(req, res) => Auth.show(req, res))

}