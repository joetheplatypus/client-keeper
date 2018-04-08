const ClientController = require('./controllers/ClientController')

module.exports = function (app) {
  app.get('/clients', ClientController.index)
  app.post('/clients', ClientController.post)
}
