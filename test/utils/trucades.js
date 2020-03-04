const ModelEstabelecimento = require('../../src/models/Estabelecimento');
const ModelUsuario = require('../../src/models/Usuario');
const ModelCartaofidelidadecpfs = require('../../src/models/CartaoFidelidadeCPF');
const ModelCartaofidelidades = require('../../src/models/CartaoFidelidade');
const ModelMetodosdepagamentos = require('../../src/models/MetodosDePagamento');
const ModelPayments = require('../../src/models/Payment');
const ModelRecompensas = require('../../src/models/Recompensa');


const estabelecimento = async () => await ModelEstabelecimento.deleteMany({});
const usuario = async () => await ModelUsuario.deleteMany({});
const cartaofidelidadecpfs = async () => await ModelCartaofidelidadecpfs.deleteMany({});
const cartaofidelidades = async () => await ModelCartaofidelidades.deleteMany({});
const metodosdepagamentos = async () => await ModelMetodosdepagamentos.deleteMany({});
const payments = async () => await ModelPayments.deleteMany({});
const recompensas = async () => await ModelRecompensas.deleteMany();


module.exports = {
    estabelecimento,
    usuario,
    cartaofidelidadecpfs,
    cartaofidelidades,
    metodosdepagamentos,
    payments,
    recompensas
};
