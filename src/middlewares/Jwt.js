const jwt = require('jsonwebtoken');
const {promisify} = require('util')
class JWT { 

	constructor(){
		this.privateKey = process.env.SECRET_KEY;
		this.expiresIn = '8h';
	}

	sing =(payload) => jwt.sign({ payload }, this.privateKey, { expiresIn: '8h' })
	
	verify = (req, res, next) => {
		const token = req.headers['authorization'];
		  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		  jwt.verify(token, this.privateKey, function(err, decoded) {
		    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		    req.userId = decoded.id;
		    next();
		  });
	}

	decoded =  (token) => jwt.decode(token, {complete: true});	
}

module.exports = new JWT();