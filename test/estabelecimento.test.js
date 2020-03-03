const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');

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
        token = await getToken()
    })


    it('Listar todos', async () => {

        await request(app)
            .get('/estabelecimentos')
            .set('Authorization', token)
            .expect(200);

    })


    it('Criar novo estabelecimento', async () => {

        const response = await request(app)
            .post('/estabelecimento')
            .set('Authorization', token)
            .expect(200)


            console.log(response)

        // estabelecimentoDemo._id = response.body._id;

    })


    // it('Listar um', async () => {

    //     await request(app)
    //         .get(`/estabelecimento/${estabelecimentoDemo._id}`)
    //         .set('Authorization', token)
    //         .expect(200)

    // })


    // it('Atualizar um', async () => {

    //     await request(app)
    //         .put(`/estabelecimento/${estabelecimentoDemo._id}`)
    //         .set('Authorization', token)
    //         .send({
    //             nome: 'Atualizando nome para teste'
    //         })
    //         .expect(200)

    // })
    // it('Remover um', async () => {

    //     await request(app)
    //         .delete(`/estabelecimento/${estabelecimentoDemo._id}`)
    //         .set('Authorization', token)
    //         .expect(200)

    // })


});