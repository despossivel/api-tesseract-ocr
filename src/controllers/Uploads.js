class Uploads {

    usuario(req,res){
        res.send({file:req.file.filename, _idUsuario: req.body._idUsuario})
    }

    estabelecimento(req, res){
        console.log(req.body)

        res.send({file:req.file.filename, _idEstabelecimento: req.body._idEstabelecimento})
    }

}


module.exports = () => new Uploads()