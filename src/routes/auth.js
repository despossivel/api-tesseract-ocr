module.exports = (application) =>{
  
    application.get('/auth', (req, res) => application.src.controllers.Auth.login(req, res))

}