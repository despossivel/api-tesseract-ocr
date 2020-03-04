const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

const { metodosdepagamentos: trucade } = require('./utils/trucades')

let token;

// --reporter nyan

const cvv = 232;

let metodoDePagamentoDemo = {
    "_idUsuario": "5e152a5e51ba6e019f7f0c7c",
    "tipo": "debito",
    "titular": "Matheus Henrique S. B.",
    "numero": 1212121212121212,
    "mes": 2,
    "ano": 20
};

describe('Metodos de pagamento', () => {

    before('token', async () => {
        await trucade();
        token = await getToken()
    })

    it('Criar novo metodo de pagamento', async () => {

        const response = await request(app)
            .post('/metodo/pagamento')
            .set('Authorization', token)
            .send(metodoDePagamentoDemo).expect(200)

        metodoDePagamentoDemo._id = response.body._id;

    });

    it('Listar todos os metodos de pagamento', (done) => {

        request(app)
            .get('/metodos/pagamento')
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Listar um metodo de pagamento', (done) => {
        request(app)
            .get(`/metodo/pagamento/${cvv}/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Atualizar uma metodo de pagamento', (done) => {
        request(app)
            .put(`/metodo/pagamento/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .send({
                titular: 'Matheus teste'
            })
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Remover um metodo de pagamento', (done) => {
        request(app)
            .delete(`/metodo/pagamento/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })





});