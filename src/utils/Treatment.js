class Treatment {
 
    constructor(){
        this.data;
    }

      jsonResponse(data) {
		let response;
		data.length == 0
			? response = { errors: [{ "msg": "Nenhum estabelecimento encontrado!" }], status: 404 }
			: response = { data, status: 200 }
		return response;
    }
    
}

module.exports = () => new Treatment();