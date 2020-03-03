const estabelecimentos = async (model, find) =>   await model.aggregate().lookup({
        from: 'estabelecimentos', localField: '_idEstabelecimento',
        foreignField: '_id', as: 'estabelecimento'
    }).match(find);

const usuarios = async (model, find) =>  await model.aggregate([{
        $lookup: {
            from: 'usuarios',
            localField: '_idUsuario',
            foreignField: '_id',
            as: 'usuario'
        }
    }
    ]).match(find);

module.exports["estabelecimentos"] = estabelecimentos;
module.exports["usuarios"] = usuarios;