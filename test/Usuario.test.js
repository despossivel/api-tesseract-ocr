const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

let token;

// --reporter nyan

let usuarioDemo = {
    "nome": "Daniel",
    "usuario": "daniel",
    "email": "danel@gmail.com.br",
    "estado": 12,
    "municipio": 1200427,
    "senha": "qazx123.",
    "telefone": "9499910000384966"
};

describe('Usuarios', () => {

    before('token', async () => {
        token = await getToken()
    })

    it('Criar novo usuario', async () => {

        const response = await request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(usuarioDemo).expect(200);

        usuarioDemo._id = response.body._id;

    });


    it('Criar novo usuario com nome de usuario já cadastrado', async () => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.telefone = '9499910000384933';

        const response = await request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422);

    })

    it('Criar novo usuario com email já cadastrado', async () => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.usuario = 'daniel2';
        novoUsuarioDemo.telefone = '9499910000384933';

        const response = await request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422);


    })

    it('Criar novo usuario com telefone já cadastrado', async () => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.usuario = 'daniel2';

        const response = await request(app)
            .post('/usuario')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422);

    })




    it('Listar todos usuarios', async () => {

        await request(app)
            .get('/usuarios')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar um usuario', async () => {
        await request(app)
            .get(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Atualizar um usuario', async () => {
        await request(app)
            .put(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .send({
                nome: 'Novo com teste'
            })
            .expect(200);
    })


    it('Remover um usuario', async () => {
        await request(app)
            .delete(`/usuario/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })





});