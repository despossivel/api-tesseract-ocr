const request = require('supertest');
const app = require('../src/server');


describe('Authenticação', function () {

  it('Efetuar login', async function () {

    const response = await request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123."
      }).expect(200);

  //  console.log(response.body.token)

  });


  it('Efetuar login com senha errada', async function () {

    const response = await request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123"
      }).expect(404);

  //  console.log(response.body.token)

  });


});