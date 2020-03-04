const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

const { estabelecimento: estabelecimentoTrucade } = require('./utils/trucades')

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
        await estabelecimentoTrucade();
        token = await getToken()
    })

    it('Criar novo estabelecimento', async () => {

        const response = await request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(estabelecimentoDemo)
            .expect(200)

        estabelecimentoDemo._id = response.body._id;

    })

    it('Criar novo estabelecimento com CNPJ já cadastrado', async () => {
        let { _id, ...novoEstabelecimentoDemo } = estabelecimentoDemo;
        novoEstabelecimentoDemo.telefone = '1928166899';

        await request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(novoEstabelecimentoDemo)
            .expect(422)

    })

    it('Criar novo estabelecimento com telefone já cadastrado', async () => {
        let { _id, ...novoEstabelecimentoDemo } = estabelecimentoDemo;
        novoEstabelecimentoDemo.cnpj = '84.134.197/0001-44';

       await request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .send(novoEstabelecimentoDemo)
            .expect(422)

    })


    it('Listar todos', async () => {

        await request(app)
            .get('/estabelecimentos')
            .set('Authorization', token)
            .expect(200);

    })



    it('Listar todos estabelecimentos de um usuario', async () => {

        await request(app)
            .get(`/estabelecimentos?_idUsuario=${estabelecimentoDemo._idUsuario}`)
            .set('Authorization', token)
            .expect(200);

    })

    it('Listar um estabelecimento', async () => {

        await request(app)
            .get(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .expect(200)

    })


    it('Atualizar um estabelecimento', async () => {

        await request(app)
            .put(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .send({
                nome: 'Atualizando nome para teste'
            })
            .expect(200)

    })
    it('Remover um estabelecimento', async () => {

        await request(app)
            .delete(`/estabelecimento/${estabelecimentoDemo._id}`)
            .set('Authorization', token)
            .expect(200)

    })


});