const request = require('supertest');

const response = await request(app)
    .post('/auth')
    .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123."
    })
    .expect(200);

module.exports = response.body.token;