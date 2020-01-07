const jwt = require('jsonwebtoken');
class JWT { 

	constructor(){
		this.privateKey = process.env.SECRET_KEY;
		this.expiresIn = '8h';
	}

	sing =(payload) => jwt.sign({ payload }, this.privateKey, { expiresIn: '8h' })
	verify = (token) => jwt.verify(token, this.privateKey, (err, decoded) => decoded)
	decoded =  (token) => jwt.decode(token, {complete: true});
	
	check = async (req, res) => {
		const header = req.headers.authorization;
		if (!header) return res.status(401).json({ error: 'Token not provided' });
		const [, token] = header.split(' ');
		try {
		  const decoded = await promisify(this.jwt.verify)(token, this.privateKey);
		  req.userId = decoded.id;
		  return next();
		} catch (error) {
		  return res.status(401).json({ error: 'Token Invalid' });
		}
	}
	
}

module.exports = new JWT();