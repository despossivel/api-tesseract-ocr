'use strict';

const app = require('./src/server'),
    PORT = 5000;

app.listen(process.env.PORT || PORT, _ => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));