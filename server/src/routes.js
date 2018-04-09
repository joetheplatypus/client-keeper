const ClientController = require('./controllers/ClientController')
const DropinController = require('./controllers/DropinController')

module.exports = function (app) {
  app.get('/clients', ClientController.index)
  app.get('/clients/:clientId', ClientController.get)
  app.post('/clients', ClientController.post)
  app.put('/clients/:clientId', ClientController.put)

  app.get('/dropins', DropinController.index)
  app.get('/dropins/:dropinId', DropinController.get)
  app.post('/dropins', DropinController.post)
  app.put('/dropins/:dropinId', DropinController.put)
}
