const mongoose = require('mongoose');

const ValidatorQuery = (data) => {
    let { strategy, ...query } = data;
    let find = { ...query };
    let ids = {};
    const _idsConvert = Object.keys(query).map(key => {
        switch (key) {
            case '_id':
            case '_idUsuario':
            case '_idEstabelecimento':
                return { [key]: mongoose.Types.ObjectId(query[key]) };
                break;
        }
    });


    if (_idsConvert.length > 0) {
        ids = _idsConvert.reduce((accumulator, current) => ({ ...accumulator, ...current }))
    }

    if(!strategy){
        strategy = 'estabelecimentos';
    }

    return { ...find, ...ids, strategy };
}

module.exports = ValidatorQuery;