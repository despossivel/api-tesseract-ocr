'use strict';

const app = require('./src/server'),
    PORT = 8888;

app.listen(process.env.PORT || PORT, _ => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));