const {Client} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const clients = await Client.findAll({
        limit: 10
      })
      res.send(clients)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the clients'
      })
    }
  },
  async post (req, res) {
    try {
      const client = await Client.create(req.body)
      res.send(client)
    } catch (err) {
      res.status(400).send({
        error: 'this email has already been used'
      })
    }
  }
}
