const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

let token;

// --reporter nyan

describe('Uploads', () => {

    before('token', async () => {
        token = await getToken()
    })

    it('Efetuar uploads de foto do usuario', async () => {
        /*
        const response = await request(app)
            .post('/upload/foto')
            .set('Authorization', token)
            .send(paymentDemo).expect(200);
        */

    });

    it('Efetuar uploads de logo do estabelecimento', async () => {
        /*
        const response = await request(app)
            .post('/upload/logo')
            .set('Authorization', token)
            .send(paymentDemo).expect(200);
        */

    });




});