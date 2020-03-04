const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

const { estabelecimento: trucade } = require('./utils/trucades')

let token;

let estabelecimentoDemo = {
    "nome": "Estabelecmento teste",
    "nomeFantasia": "Conveniencia test",
    "cnpj": "84.134.197/0001-40",
    "telefone": "19 2816 6877",
    "endereco": "Avenida Alfredo Contatto, Jardim São Fernando",
    "estado": 12,
    "municipio": 1200427,
    "_idUsuario": "5e5d9d29f9029e500d2ae442"
}

describe('Estabelecimentos', () => {

    before('token', async () => {
        await trucade();
        token = await getToken()
    })

    it('Criar novo estabelecimento', (done) => {

        const response = request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(estabelecimentoDemo)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

        estabelecimentoDemo._id = response.body._id;

    })

    it('Criar novo estabelecimento com CNPJ já cadastrado', (done) => {
        let { _id, ...novoEstabelecimentoDemo } = estabelecimentoDemo;
        novoEstabelecimentoDemo.telefone = '1928166899';

        request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(novoEstabelecimentoDemo)
            .expect(422)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Criar novo estabelecimento com telefone já cadastrado', (done) => {
        let { _id, ...novoEstabelecimentoDemo } = estabelecimentoDemo;
        novoEstabelecimentoDemo.cnpj = '84.134.197/0001-44';

        request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(novoEstabelecimentoDemo)
            .expect(422)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })


    it('Listar todos', (done) => {

        request(app)
            .get('/estabelecimentos')
            .set('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });;

    })



    it('Listar todos estabelecimentos de um usuario', (done) => {

        request(app)
            .get(`/estabelecimentos?_idUsuario=${estabelecimentoDemo._idUsuario}`)
            .set('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });;

    })

    it('Listar um estabelecimento', (done) => {

        request(app)
            .get(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })


    it('Atualizar um estabelecimento', (done) => {

        request(app)
            .put(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .send({
                nome: 'Atualizando nome para teste'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })
    it('Remover um estabelecimento', (done) => {

        request(app)
            .delete(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })


});