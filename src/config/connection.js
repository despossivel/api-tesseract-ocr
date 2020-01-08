const mongoose = require('mongoose')

const connection = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Mongoose se conectou som sucesso!')).catch(e => console.error(e))

module.exports = () => connection;