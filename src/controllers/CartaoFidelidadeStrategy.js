const ModelUsuario = require('../models/Usuario');
const ModelCartaoFidelidade = require('../models/CartaoFidelidade');
const ModelCartaoFidelidadeCPF = require('../models/CartaoFidelidadeCPF');
const mongoose = require('mongoose')


//${process.env.HOST}/static/uploads/${encodeURIComponent(this.logo)}
const estabelecimentos = async (find) => {

    const cartoes = await ModelCartaoFidelidade.aggregate().lookup({
        from: 'estabelecimentos', localField: '_idEstabelecimento',
        foreignField: '_id', as: 'estabelecimento'
    }).match(find);
 
    cartoes.map((item, ...rest) => {
        const [estabelecimentoOne] = item.estabelecimento;
        const {
            logo
        } = estabelecimentoOne;
        estabelecimentoOne.logoUrl = `${process.env.HOST}/static/uploads/${encodeURIComponent(logo)}`;
        return {
            estabelecimentoOne,
            ...rest
        }
    })

    return cartoes;
}

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

    //verificar se o usuario existe
    const [findUsuario] = await ModelUsuario.find({
        _id: _idUsuario
    })


    const [findCartaoFideldiade] = await ModelCartaoFidelidade.find({
        _idUsuario,
        _idEstabelecimento
    })

    if (findCartaoFideldiade) {

        const {
            _id: _idCartaoFidelidadeUsuario,
            pontos: pontosCurrent
        } = findCartaoFideldiade;

        return await ModelCartaoFidelidade.updateOne({
            _id
        }, {
            pontos: parseInt(pontos) + parseInt(pontosCurrent)
        });

    }


    //se existir 
    if (findUsuario) {
        const { cpf } = findUsuario;

        //verificar se o CPF já esta cadastrado nos cartoes por CPF
        const [findCartaoFideldiadeCpf] = await ModelCartaoFidelidadeCPF.find({
            _idEstabelecimento: mongoose.Types.ObjectId(_idEstabelecimento),
            cpf
        });

        //se existir obtem os pontos
        if (findCartaoFideldiadeCpf) {
            const {
                pontos: pontosInCpf
            } = findCartaoFideldiadeCpf;

            doc.pontos = parseInt(pontos) + parseInt(pontosInCpf);
        }

    }
    // e cria o cartão
    return await ModelCartaoFidelidade.create(doc);

};




const cpfCreateCartaoFidelidade = async (doc) => {
    const { cpf, _idEstabelecimento, pontos } = doc;
    const [findUsuario] = await ModelUsuario.find({ cpf });


    //verificar se o CPF já existe se existir adicionar pontos
    const [findCPFExist] = await ModelCartaoFidelidadeCPF.find({ cpf, _idEstabelecimento });




    if (findCPFExist) {
        const {
            _id: _idCartaoFidelidadeCPF,
            pontos: pontosCurrentCPF
        } = findCPFExist;

        return await ModelCartaoFidelidadeCPF.updateOne({
            _id: _idCartaoFidelidadeCPF,
            _idEstabelecimento
        }, {
            pontos: parseInt(pontosCurrentCPF) + parseInt(pontos)
        });
    }



    // se o cpf não existir na tabela de usuario cria o cartão por CPF
    if (!findUsuario) return await ModelCartaoFidelidadeCPF.create(doc);


    // se existir o cpf na tabela de usuario e não existir nenhum cartão fidelidade
    const { _id: _idUsuario } = findUsuario;
    const [checkCartaoFidelidadeUsuario] = await ModelCartaoFidelidade.find({
        _idUsuario,
        _idEstabelecimento
    })

    // console.log(checkCartaoFidelidadeUsuario)

    if (!checkCartaoFidelidadeUsuario) return await ModelCartaoFidelidade.create({
        _idUsuario,
        _idEstabelecimento,
        pontos
    })

    // se existir o cpf na tabela de usuario, adiciona os pontos ao usuario
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
    /////////////////////////////////////////////////////////////////////////

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