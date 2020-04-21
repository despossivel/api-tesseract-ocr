const mongoose = require('mongoose')

const connection = mongoose.connect(`mongodb+srv://dev:qazx123.@cluster0-ep251.gcp.mongodb.net/dev`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Mongoose se conectou som sucesso ao banco Dev!`)
}).catch(e => console.error(e))


const { parseISO, isAfter, addDays } = require('date-fns')

const Licence = require('../src/models/Licence');
const Estabelecimento = require('../src/models/Estabelecimento');

const run = async () => {

    // const estabelecimentos = await Estabelecimento.find({});
    // const estabelecimentosId = estabelecimentos.map(({ _id }) => {
    //     return { _id };
    // })

    // // console.log(estabelecimentosId)
    // const licences = await Licence.find({ _id: { "$in": estabelecimentosId } });
    const licences = await Licence.find({});


    const expireds = licences.map(({ updatedAt, venceEm, _idEstabelecimento }) => {
        const newVenceEm = venceEm;
        const status = isAfter(new Date(), newVenceEm);

        if (status) return _idEstabelecimento;

    })

    const filterExpireds = expireds.filter(item => item)

    await Estabelecimento.updateMany({ _id: filterExpireds }, { licence: false })
    await Licence.updateMany({ _idEstabelecimento: filterExpireds }, { status: false })
    console.log('Enviar notificação de licença expirada')
    mongoose.connection.close()
    return;
}

run()
