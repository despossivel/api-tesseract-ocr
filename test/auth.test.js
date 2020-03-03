const request = require('supertest');
const app = require('../src/server');


describe('Authenticação', () => {

  it('Efetuar login', async () => {

    const response = await request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123."
      }).expect(200);

  });


  it('Efetuar login com senha errada', async () => {

    const response = await request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123"
      }).expect(404);

  });


});