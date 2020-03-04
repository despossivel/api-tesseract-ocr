const request = require('supertest');
const app = require('../../src/server');
const createUserInitial = async () => {
    await request(app)
        .post('/usuario')
        // .set('Authorization', token)
        .send({
            "nome": "Matheus",
            "usuario": "despossivel",
            "cpf": "029.026.062-06",
            "email": "mattbmoller@gmail.com",
            "estado": 12,
            "municipio": 1200427,
            "senha": "qazx123.",
            "telefone": "949991384966",
            "status": true
        }).expect(200);
}


module.exports = createUserInitial;