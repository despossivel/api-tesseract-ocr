const request = require('supertest');
const app = require('../src/server');

const createUserInitial = require('./utils/createUserInitial');
const { usuario: trucade } = require('./utils/trucades')

describe('Authenticação', () => {

  before(async () => {
    await trucade();
    await createUserInitial()
  })

  it('Efetuar login', (done) => {

    request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123."
      }).expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });

  });


  it('Efetuar login com senha errada', (done) => {

     request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        senha: "qazx123"
      }).expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });

  });


});

