const Usuario = require('../../../src/models/Usuario')
 

describe('Models usuario', ()=>{


	it('index', async ()=>{
		const usuarios = await Usuario.find().catch(e=>console.log(e))
 

		expect(usuarios).toBe([])


	})


})