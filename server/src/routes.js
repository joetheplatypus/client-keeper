const ClientController = require('./controllers/ClientController')
const DropinController = require('./controllers/DropinController')
const CounsellingController = require('./controllers/CounsellingController')

module.exports = function (app) {
  app.get('/clients', ClientController.index)
  app.get('/clients/:clientId', ClientController.get)
  app.get('/clients/:clientId/dropins', ClientController.getDropins)
  app.post('/clients', ClientController.post)
  app.put('/clients/:clientId', ClientController.put)

  app.get('/dropins', DropinController.index)
  app.get('/dropins/:dropinId', DropinController.get)
  app.post('/dropins', DropinController.post)
  app.put('/dropins/:dropinId', DropinController.put)

  app.get('/counselling', CounsellingController.index)
  app.get('/counselling/:sessionId', CounsellingController.get)
  app.post('/counselling', CounsellingController.post)
  app.put('/counselling/:sessionId', CounsellingController.put)
}
