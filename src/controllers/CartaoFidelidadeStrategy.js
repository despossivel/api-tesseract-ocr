
const ModelCartaoFidelidade = require('../models/CartaoFidelidade');
const ModelCartaoFidelidadeCPF = require('../models/CartaoFidelidadeCPF');


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





const createCartaoFidelidade = async (doc) => await ModelCartaoFidelidade.create(doc);
const cpfCreateCartaoFidelidade = async (doc) => await ModelCartaoFidelidadeCPF.create(doc);


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