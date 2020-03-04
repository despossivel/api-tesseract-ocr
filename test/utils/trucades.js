const ModelEstabelecimento = require('../../src/models/Estabelecimento');
const ModelUsuario = require('../../src/models/Usuario');

const estabelecimento = async () => await ModelEstabelecimento.deleteMany({});
const usuario = async () => await ModelUsuario.deleteMany({});


module.exports = {
    estabelecimento,
    usuario
}
