
const axios = require('axios'),
    parseXmlToJson = require('../utils/parseXmlToJson');


class Payments {

    index = async (req, res) => res.status(404).send({ errors: [{ "msg": "Nada disponivel para este metodo!" }] })

    show = async (req, res) => res.status(404).send({ errors: [{ "msg": "Nada disponivel para este metodo!" }] })

    async store(req, res) {
        const { data } = await axios.post(`${process.env.HOST_PAGSEGURO}/sessions?email=${process.env.EMAIL_PAGSEGURO}&token=${process.env.TOKEN_PAGSEGURO}`),
            JSON_ = parseXmlToJson(data)

        res.status(200).send(JSON_)

    }

}

module.exports = new Payments();