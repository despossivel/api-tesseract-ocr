const estabelecimentos = async (model, find) => {

    const data = await model.aggregate().lookup({
        from: 'estabelecimentos', localField: '_idEstabelecimento',
        foreignField: '_id', as: 'estabelecimento'
    }).match(find);

    const response = data.map(c => {
        let { pontos, estabelecimento } = c;
        [estabelecimento] = estabelecimento;
        return { pontos, ...estabelecimento };
    })

    return response;

}

const usuarios = async (model, find) => {

    const data = await model.aggregate().lookup({
        from: 'usuarios', localField: '_idUsuario',
        foreignField: '_id', as: 'usuario'
    }).match(find);

    const response = data.map(c => {
        let { pontos, usuario } = c;
        [usuario] = usuario;
        return { pontos, ...usuario };
    })

    return response;
}

module.exports["estabelecimentos"] = estabelecimentos;
module.exports["usuarios"] = usuarios;