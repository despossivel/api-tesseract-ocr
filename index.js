'use strict';

const app = require('./src/server');
const PORT = 5000;

app.listen(process.env.PORT || PORT, () => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));