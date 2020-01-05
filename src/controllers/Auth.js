class Auth {

	login(req,res){
		 res.status(200).send({  lol:true });
	}


}


module.exports = new Auth();