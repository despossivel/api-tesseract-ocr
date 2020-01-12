const cielo = require('cielo')({
    'MerchantId': process.env.MERCHANT_ID_Dev,
    'MerchantKey': process.env.MERCHANT_KEY_DEV,
    'sandbox': process.env.SANDBOX, // Opcional - Ambiente de Testes
   // 'debug': process.env.DEBUG
});
                         
module.exports = cielo;