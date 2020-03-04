const cielo = require('cielo')({
    'MerchantId': process.env.MERCHANT_ID,
    'MerchantKey': process.env.MERCHANT_KEY,
    'sandbox': process.env.SANDBOX, // Opcional - Ambiente de Testes
    'debug': process.env.DEBUG
});

module.exports = cielo;