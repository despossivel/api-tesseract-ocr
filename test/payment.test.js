const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');
const { payments: trucade } = require('./utils/trucades')

let token;

// --reporter nyan

let paymentDemo = {
    "_idUsuario": "5e5d9d29f9029e500d2ae442",
    "_idEstabelecimento": "5e5da23d36f34e60cff9b7e4",
    "CardNumber": 5428959885413111,
    "Holder": "teste",
    "ExpirationDate": "11/2020",
    "SecurityCode": 123,
    "Brand": "Visa",
    "Type": "DebitCard",
    "Amount": 23242
};

describe('Pagamentos', () => {

    before('token', async () => {
        await trucade();
        token = await getToken();
    })

    it('Efetuar um pagamento', async () => {


        const response =  await request(app)
            .post('/payment')
            .set('Authorization', token)
            .send(paymentDemo).expect(200)

        paymentDemo._id = response.body._id;

    });

    it('Listar todos os pagamentos', (done) => {

        request(app)
            .get('/payments')
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

            

    })

    it('Listar um pagamento', (done) => {
        request(app)
            .get(`/payment/${paymentDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })

    /*
        it('Atualizar uma metodo de pagamento', (done) => {
            request(app)
                .put(`/metodo/pagamento/${paymentDemo._id}`)
                .set('Authorization', token)
                .send({
                    titular: 'Matheus teste'
                })
                .expect(200)  .end(function(err, res) {
        if (err) return done(err);
        done();
      });
        })
    
    
        it('Remover um metodo de pagamento', (done) => {
            request(app)
                .delete(`/metodo/pagamento/${paymentDemo._id}`)
                .set('Authorization', token)
                .expect(200)  .end(function(err, res) {
        if (err) return done(err);
        done();
      });
        })
    */




});