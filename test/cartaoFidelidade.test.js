const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

let token;

// --reporter nyan

let cartaoDemo = {
    "_idEstabelecimento": "5e5da23d36f34e60cff9b7e4",
    "_idUsuario": "5e5da28f36f34e60cff9b7e5",
    "pontos": 100
};

let cartaoCPFDemo = {
    "_idEstabelecimento": "5e5da23d36f34e60cff9b7e4",
    "cpf": "029.026.062-06",
    "pontos": 100
};

describe('Cartões fidelidade', () => {

    before('token', async () => {
        token = await getToken()
    })

    it('Criar novo cartão fidelidade', async () => {

        const response = await request(app)
            .post('/cartao/fidelidade')
            .set('Authorization', token)
            .send(cartaoDemo).expect(200);

        cartaoDemo._id = response.body._id;

    });

    it('Criar novo cartão fidelidade para CPF', async () => {

        const response = await request(app)
            .post('/cartao/fidelidade')
            .set('Authorization', token)
            .send(cartaoDemo).expect(200);

        cartaoCPFDemo._id = response.body._id;

    });




    //por patrão o strategy é de estabelecimentos
    it('Listar todos os cartões fidelidade', async () => {

        await request(app)
            .get('/cartoes/fidelidade')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar todos cartões com o strategy de usuarios', async () => {

        await request(app)
            .get('/cartoes/fidelidade?strategy=usuarios')
            .set('Authorization', token)
            .expect(200);

    })



    it('Listar todos cartões com o strategy de CPF', async () => {

        await request(app)
            .get('/cartoes/fidelidade?strategy=cpf')
            .set('Authorization', token)
            .expect(200);

    })


    it('Listar todos cartões com o strategy de estabelecimentos', async () => {

        await request(app)
            .get('/cartoes/fidelidade?strategy=estabelecimentos')
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar todos os cartões fidelidade de um CPF', async () => {

        await request(app)
            .get(`/cartoes/fidelidade?strategy=cpf&cpf=${cartaoCPFDemo.cpf}`)
            .set('Authorization', token)
            .expect(200);

    })



    it('Listar todos os cartões fidelidade de um usuario', async () => {

        await request(app)
            .get(`/cartoes/fidelidade?_idUsuario=${cartaoDemo._idUsuario}`)
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar todos os cartões fidelidade de um estabelecimento', async () => {
        await request(app)
            .get(`/cartoes/fidelidade?_idEstabelecimento=${cartaoDemo._idEstabelecimento}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Listar um cartão fidelidade', async () => {
        await request(app)
            .get(`/cartao/fidelidade/${cartaoDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Listar um cartão fidelidade com o strategy de usuario ', async () => {
        await request(app)
            .get(`/cartao/fidelidade/${cartaoDemo._id}?strategy=usuarios`)
            .set('Authorization', token)
            .expect(200);
    })

    it('Listar um cartão fidelidade com o strategy de estabelecimento ', async () => {
        await request(app)
            .get(`/cartao/fidelidade/${cartaoDemo._id}?strategy=estabelecimentos`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Atualizar um cartão fidelidade', async () => {
        await request(app)
            .put(`/cartao/fidelidade/${cartaoDemo._idEstabelecimento}/${cartaoDemo._idUsuario}`)
            .set('Authorization', token)
            .send({
                pontos: 200
            })
            .expect(200);
    })


    it('Atualizar um cartão fidelidade em um CPF', async () => {
        await request(app)
            .put(`/cartao/fidelidade/${cartaoCPFDemo._idEstabelecimento}/${cartaoCPFDemo.cpf}?strategy=cpf`)
            .set('Authorization', token)
            .send({
                pontos: 200
            })
            .expect(200);
    })





    it('Remover um cartão fidelidade', async () => {
        await request(app)
            .delete(`/cartao/fidelidade/${cartaoDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })


    it('Remover um cartão fidelidade CPF', async () => {
        await request(app)
            .delete(`/cartao/fidelidade/${cartaoCPFDemo._id}`)
            .set('Authorization', token)
            .expect(200);
    })





});