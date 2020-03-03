const request = require('supertest');
const app = require('../../src/server');

const getToken = async () => {

    const response = await request(app)
        .post('/auth')
        .send({
            email: "mattbmoller@gmail.com",
            senha: "qazx123."
        })
        .expect(200);

    return response.body.token;;
}

module.exports = getToken;