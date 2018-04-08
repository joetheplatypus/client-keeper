const ClientController = require('./controllers/ClientController')

module.exports = function (app) {
  app.get('/clients', ClientController.index)
  app.get('/clients/:clientId', ClientController.get)
  app.post('/clients', ClientController.post)
  app.put('/clients/:clientId', ClientController.put)
}
