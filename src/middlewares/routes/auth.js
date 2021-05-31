const { check } = require('express-validator'),
    expressValidation = require('../expressValidation')

module.exports = {
    index: [
        expressValidation.validation
    ]
};