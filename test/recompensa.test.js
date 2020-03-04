const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

let token;

// --reporter nyan

let recomepnsaDemo = {
    "_idEstabelecimento": "5e5da23d36f34e60cff9b7e4",
    "titulo": "Sobre-mesa",
    "descricao": "Ganhe uma sobre mesa gratis",
    "quantidadePontos": 30
};

describe('Recompensas', () => {

    before('token', async () => {
        token = await getToken()
    })

    it('Criar nova recomepnsa', async () => {

        const response = await request(app)
            .post('/recompensa')
            .set('Authorization', token)
            .send(recomepnsaDemo).expect(200);

        recomepnsaDemo._id = response.body._id;

    });

    it('Listar todas as recompensas', async () => {

        await request(app)
            .get('/recompensas')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar uma recompensa', async () => {
        await request(app)
            .get(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Atualizar uma recompensa', async () => {
        await request(app)
            .put(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .send({
                quantidadePontos: 300
            })
            .expect(200);
    })


    it('Remover uma recompensa', async () => {
        await request(app)
            .delete(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })





});