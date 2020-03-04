const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

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
        token = await getToken()
    })

    it('Criar novo metodo de pagamento', async () => {

        const response = await request(app)
            .post('/metodo/pagamento')
            .set('Authorization', token)
            .send(metodoDePagamentoDemo).expect(200);

        metodoDePagamentoDemo._id = response.body._id;

    });

    it('Listar todos os metodos de pagamento', async () => {

        await request(app)
            .get('/metodos/pagamento')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar um metodo de pagamento', async () => {
        await request(app)
            .get(`/metodo/pagamento/${cvv}/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Atualizar uma metodo de pagamento', async () => {
        await request(app)
            .put(`/metodo/pagamento/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .send({
                titular: 'Matheus teste'
            })
            .expect(200);
    })


    it('Remover um metodo de pagamento', async () => {
        await request(app)
            .delete(`/metodo/pagamento/${metodoDePagamentoDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })





});