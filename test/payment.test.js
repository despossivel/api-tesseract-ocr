const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

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
        token = await getToken()
    })

    it('Efetuar um pagamento', async () => {

        const response = await request(app)
            .post('/payment')
            .set('Authorization', token)
            .send(paymentDemo).expect(200);

        paymentDemo._id = response.body._id;

    });

    it('Listar todos os pagamentos', async () => {

        await request(app)
            .get('/payments')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar um pagamento', async () => {
        await request(app)
            .get(`/payment/${paymentDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })

    /*
        it('Atualizar uma metodo de pagamento', async () => {
            await request(app)
                .put(`/metodo/pagamento/${paymentDemo._id}`)
                .set('Authorization', token)
                .send({
                    titular: 'Matheus teste'
                })
                .expect(200);
        })
    
    
        it('Remover um metodo de pagamento', async () => {
            await request(app)
                .delete(`/metodo/pagamento/${paymentDemo._id}`)
                .set('Authorization', token)
                .expect(200);
        })
    */




});