const ClientController = require('./controllers/ClientController')
const DropinController = require('./controllers/DropinController')
const CounsellingController = require('./controllers/CounsellingController')
const InteractionController = require('./controllers/InteractionController')

module.exports = function (app) {
  app.get('/clients', ClientController.index)
  app.get('/clients/:clientId', ClientController.get)
  app.get('/clients/:clientId/dropins', ClientController.getDropins)
  app.get('/clients/:clientId/counselling', ClientController.getCounsellingSessions)
  app.get('/clients/:clientId/interactions', ClientController.getInteractions)
  app.post('/clients', ClientController.post)
  app.put('/clients/:clientId', ClientController.put)
  app.delete('/clients/:clientId', ClientController.delete)

  app.get('/dropins', DropinController.index)
  app.get('/dropins/:dropinId', DropinController.get)
  app.post('/dropins', DropinController.post)
  app.put('/dropins/:dropinId', DropinController.put)
  app.delete('/dropins/:dropinId', DropinController.delete)

  app.get('/counselling', CounsellingController.index)
  app.get('/counselling/:sessionId', CounsellingController.get)
  app.post('/counselling', CounsellingController.post)
  app.put('/counselling/:sessionId', CounsellingController.put)
  app.delete('/counselling/:sessionId', CounsellingController.delete)

  app.get('/interactions', InteractionController.index)
  app.get('/interactions/:interactionId', InteractionController.get)
  app.post('/interactions', InteractionController.post)
  app.put('/interactions/:interactionId', InteractionController.put)
  app.delete('/interactions/:interactionId', InteractionController.delete)
}
