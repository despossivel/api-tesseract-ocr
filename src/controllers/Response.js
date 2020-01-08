class Response {

	async send(res, data) {
		try {
			const response = {};

			if (data.lenght == 0) {
				response.error = true
				response.mensage = 'Hotspots não encontrado1'
				response.code = 401;
			} else {
				response.success = true;
				response.code = 200;
				response.data = data;
			}

			res.status(response.code).send(response);

		} catch (e) {
			throw e;
		}

	}

}

module.exports = () => new Response();