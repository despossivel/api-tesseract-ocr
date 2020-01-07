const jwt = require('jsonwebtoken');
const {promisify} = require('util')

class JWT { 

	constructor(){
		this.privateKey = process.env.SECRET_KEY;
		this.expiresIn = '8h';
	}

	sing =(payload) => jwt.sign({ payload }, this.privateKey, { expiresIn: '8h' })
	

	verify = (req, res, next) => {
		//jwt.verify(token, this.privateKey, (err, decoded) => decoded)
		 const token = req.headers['authorization'];
 
		  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		  
		  jwt.verify(token, this.privateKey, function(err, decoded) {
		    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		    
		    // se tudo estiver ok, salva no request para uso posterior
		    req.userId = decoded.id;
		    next();
		  });
	}


	decoded =  (token) => jwt.decode(token, {complete: true});
	
	check = async (req, res) => {
		const header = req.headers.authorization;

		if (!header) return res.status(401).json({ error: 'Token not provided' });
		const [, token] = header.split(' ');
		  
		  console.log('decoded')

		//try {
		  const decoded = await promisify(this.verify)(token, this.privateKey);
		  console.log('decoded')
		  	next();
		//} catch (e) {
		//	  next(e);
		//}
		//next()
	}
	
}

module.exports = new JWT();