const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');
const { recompensas: trucade } = require('./utils/trucades')

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
        await trucade();
        token = await getToken()
    })

    it('Criar nova recomepnsa', (done) => {

        const response = request(app)
            .post('/recompensa')
            .set('Authorization', token)
            .send(recomepnsaDemo).expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

        recomepnsaDemo._id = response.body._id;

    });

    it('Listar todas as recompensas', (done) => {

        request(app)
            .get('/recompensas')
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Listar uma recompensa', (done) => {
        request(app)
            .get(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Atualizar uma recompensa', (done) => {
        request(app)
            .put(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .send({
                quantidadePontos: 300
            })
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Remover uma recompensa', (done) => {
        request(app)
            .delete(`/recompensa/${recomepnsaDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })





});