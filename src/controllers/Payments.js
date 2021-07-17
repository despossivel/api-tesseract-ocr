const Partner = require('./PaymentsPartner')

class Payments {

	index = async (req, res) => Partner[req.params?._gateway].index(req, res)

	show = async (req, res) => Partner[req.params?._gateway].show(req, res)

	store = async (req, res) => Partner[req.params?._gateway].store(req, res)

}

module.exports = new Payments();