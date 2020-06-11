const ModelUsuario = require('../models/Usuario');
const ModelCartaoFidelidade = require('../models/CartaoFidelidade');
const ModelCartaoFidelidadeCPF = require('../models/CartaoFidelidadeCPF');
const mongoose = require('mongoose')

const estabelecimentos = async (find) => await ModelCartaoFidelidade.aggregate().lookup({
    from: 'estabelecimentos', localField: '_idEstabelecimento',
    foreignField: '_id', as: 'estabelecimento'
}).match(find);

const usuarios = async (find) => await ModelCartaoFidelidade.aggregate([{
    $lookup: {
        from: 'usuarios',
        localField: '_idUsuario',
        foreignField: '_id',
        as: 'usuario'
    }
}
]).match(find);



//
const cpf = async (find) => await ModelCartaoFidelidadeCPF.aggregate().lookup({
    from: 'estabelecimentos',
    localField: '_idEstabelecimento',
    foreignField: '_id', as: 'estabelecimento'
}).match(find);



const estabelecimentosCountDocument = async (find) => await ModelCartaoFidelidade.countDocuments(find);
const cpfCountDocument = async (find) => await ModelCartaoFidelidadeCPF.countDocuments(find);


const createCartaoFidelidade = async (doc) => {
    const { _idUsuario, _idEstabelecimento, pontos } = doc;
 
    const [findUsuario] = await ModelUsuario.find({
        _id: _idUsuario
    })

    if (findUsuario) {
        const { cpf } = findUsuario;
 
        const [findCartaoFideldiadeCpf] = await ModelCartaoFidelidadeCPF.find({
            _idEstabelecimento: mongoose.Types.ObjectId(_idEstabelecimento),
            cpf
        });
 
        if (findCartaoFideldiadeCpf) {
            const {
                pontos: pontosInCpf
            } = findCartaoFideldiadeCpf;

            doc.pontos = parseInt(pontos) + parseInt(pontosInCpf);
        }
 
    }

    return await ModelCartaoFidelidade.create(doc);
 
};




const cpfCreateCartaoFidelidade = async (doc) => {
    const { cpf, _idEstabelecimento, pontos } = doc;
    const [findUsuario] = await ModelUsuario.find({ cpf });

    if (!findUsuario) return await ModelCartaoFidelidadeCPF.create(doc);

    const { _id: _idUsuario } = findUsuario;

    const [checkCartaoFidelidadeUsuario] = await ModelCartaoFidelidade.find({
        _idUsuario,
        _idEstabelecimento
    })

    if (!checkCartaoFidelidadeUsuario) return await ModelCartaoFidelidade.create({
        _idUsuario,
        _idEstabelecimento,
        pontos
    })

    const {
        _id: _idCartaoFidelidadeUsuario,
        pontos: pontosCurrent
    } = checkCartaoFidelidadeUsuario;

    return await ModelCartaoFidelidade.updateOne({
        _id: _idCartaoFidelidadeUsuario,
        _idEstabelecimento
    }, {
        pontos: parseInt(pontosCurrent) + parseInt(pontos)
    })

};


//{ _idUsuario, _idEstabelecimento }
const estabelecimentosUpdateCartaoFidelidade = async (find, doc) => await ModelCartaoFidelidade.updateOne(find, doc)
const cpfUpdateCartaoFidelidade = async (find, doc) => await ModelCartaoFidelidadeCPF.updateOne(find, doc)


const cpfDestroyCartaoFidelidade = async (find) => await ModelCartaoFidelidadeCPF.deleteOne(find)
const estabelecimentosDestroyCartaoFidelidade = async (find) => await ModelCartaoFidelidade.deleteOne(find)



module.exports["estabelecimentos"] = estabelecimentos;
module.exports["usuarios"] = usuarios;
module.exports["cpf"] = cpf;


module.exports["estabelecimentosCountDocument"] = estabelecimentosCountDocument;
module.exports["cpfCountDocument"] = cpfCountDocument;


//Strategies de create
module.exports["estabelecimentosCreateCartaoFidelidade"] = createCartaoFidelidade;
module.exports["cpfCreateCartaoFidelidade"] = cpfCreateCartaoFidelidade;



module.exports["estabelecimentosUpdateCartaoFidelidade"] = estabelecimentosUpdateCartaoFidelidade;
module.exports["cpfUpdateCartaoFidelidade"] = cpfUpdateCartaoFidelidade;


module.exports["estabelecimentosDestroyCartaoFidelidade"] = estabelecimentosDestroyCartaoFidelidade;
module.exports["cpfDestroyCartaoFidelidade"] = cpfDestroyCartaoFidelidade;