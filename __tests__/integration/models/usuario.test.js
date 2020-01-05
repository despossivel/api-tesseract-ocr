const Usuario = require('../../../src/models/Usuario');

// describe('Models Usuario', () => {

    
    it("GET", async () => {

        const usuario = {
            nome:'sss' ,
            usuario:'sss' ,
            email:'sss',
            cidade:152515,
            estado:'sss' ,
            dataNascimento:Date(),
            senha:'sss',
            status:true
        }

        const result = await Usuario.create(usuario);

        console.log(result)
    
        expect(usuario).toEqual(usuario);
    
    
    });


// })
