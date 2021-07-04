const PaymentsPagseguro = require('./PaymentsPagseguro'),
    PaymentsCielo = require('./PaymentsPagseguro');

module.exports = {
    cielo: PaymentsCielo,
    pagseguro: PaymentsPagseguro
}