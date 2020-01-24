class Response {

	async send(res, data) {
		try {

			const { status, ...response } = data;
			res.status(status).send(response);
			return;
		} catch (e) {
			throw e;
		}

	}

}

module.exports = () => new Response();