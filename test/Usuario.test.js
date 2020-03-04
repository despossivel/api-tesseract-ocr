const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');
// const { usuario: usuarioTrucade } = require('./utils/trucades')
let token;

// --reporter nyan

let usuarioDemo = {
    "nome": "Daniel",
    "usuario": "daniel",
    "email": "danel@gmail.com.br",
    "cpf": "029.026.062-77",
    "estado": 12,
    "municipio": 1200427,
    "senha": "qazx123.",
    "telefone": "9499910000384966"
};

describe('Usuarios', () => {

    before('token', async () => {
        token = await getToken();
    })

    it('Criar novo usuario', (done) => {

        const response = request(app)
            .post('/usuario')
            // .set('Authorization', token)
            .send(usuarioDemo).expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

            console.error(response)

        usuarioDemo._id = response.body._id;

    });


    it('Criar novo usuario com CPF já cadastrado', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.telefone = '9499910000384933';
        novoUsuarioDemo.usuario = 'daniel2';

        const response = request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });


    })


    it('Criar novo usuario com nome de usuario já cadastrado', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.telefone = '9499910000384933';
        novoUsuarioDemo.cpf = '029.026.06-99';

        const response = request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Criar novo usuario com email já cadastrado', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.usuario = 'daniel2';
        novoUsuarioDemo.telefone = '9499910000384933';
        novoUsuarioDemo.cpf = '029.026.06-99';

        const response = request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });


    })

    it('Criar novo usuario com telefone já cadastrado', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.usuario = 'daniel2';
        novoUsuarioDemo.cpf = '029.026.06-99';

        const response = request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })




    it('Listar todos usuarios', (done) => {

        request(app)
            .get('/usuarios')
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Listar um usuario', (done) => {
        request(app)
            .get(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Atualizar um usuario', (done) => {
        request(app)
            .put(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .send({
                nome: 'Novo com teste'
            })
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Remover um usuario', (done) => {
        request(app)
            .delete(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })





});