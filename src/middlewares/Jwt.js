 

const jwt = require('jsonwebtoken');

class JWT { 

	constructor(){
		this.privateKey = process.env.SECRET_KEY;
		this.expiresIn = '8h';
	}

	sing = (payload) => jwt.sign({ payload }, this.privateKey, { expiresIn: '8h' })
	verify = (token) => jwt.verify(token, this.privateKey, (err, decoded) => decoded)
	decoded =  (token) => jwt.decode(token, {complete: true});

}

module.exports = new JWT();