const {Interaction, Counselling, Dropin, Client} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let clients = null
      const search = req.query.search
      if (search) {
        clients = await Client.findAll({
          where: {
            $or: [
              'email', 'name'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        clients = await Client.findAll({
          limit: 100,
          order: [['name']]
        })
      }
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
        error: 'this name/email has already been used'
      })
    }
  },
  async get (req, res) {
    try {
      const client = await Client.findById(req.params.clientId)
      if (!client) {
        res.send({
          error: 'client could not be found'
        })
      } else {
        res.send(client)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured'
      })
    }
  },
  async put (req, res) {
    try {
      const otherWithData = await Client.findAll({
        where: {
          $or: [
            {email: req.body.email}
          ]
        }
      })
      if (otherWithData.length > 0) {
        if (otherWithData[0].id === parseInt(req.params.clientId)) {
          await Client.update(req.body, {
            where: {
              id: req.params.clientId
            }
          })
        } else {
          res.status(400).send({
            error: 'this email has already been used'
          })
        }
      } else {
        await Client.update(req.body, {
          where: {
            id: req.params.clientId
          }
        })
      }
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'this an error has occured trying to update the client. This name may already have been used'
      })
    }
  },
  async delete (req, res) {
    try {
      Client.destroy({
        where: {
          id: req.params.clientId
        }
      })
      res.status(200).send({
        message: 'client deleted successfully'
      })
    } catch (err) {
      res.status(400).send({
        error: 'could not delete client'
      })
    }
  },
  async getDropins (req, res) {
    try {
      const client = await Client.findById(req.params.clientId)
      if (!client) {
        res.send({
          error: 'client could not be found'
        })
      } else {
        const attendedDropins = []
        const id = parseInt(req.params.clientId)
        const dropins = await Dropin.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
        for (var i = 0; i < dropins.length; i++) {
          for (var j = 0; j < dropins[i].attendees.length; j++) {
            if (dropins[i].attendees[j] === id) {
              attendedDropins.push(dropins[i])
            }
          }
        }
        res.send(attendedDropins)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured'
      })
    }
  },
  async getCounsellingSessions (req, res) {
    try {
      const client = await Client.findById(req.params.clientId)
      if (!client) {
        res.send({
          error: 'client could not be found'
        })
      } else {
        const attendedSessions = []
        const id = parseInt(req.params.clientId)
        const sessions = await Counselling.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
        for (var i = 0; i < sessions.length; i++) {
          for (var j = 0; j < sessions[i].attendees.length; j++) {
            if (sessions[i].attendees[j] === id) {
              attendedSessions.push(sessions[i])
            }
          }
        }
        res.send(attendedSessions)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured'
      })
    }
  },
  async getInteractions (req, res) {
    try {
      const client = await Client.findById(req.params.clientId)
      if (!client) {
        res.send({
          error: 'client could not be found'
        })
      } else {
        const attendedSessions = []
        const id = parseInt(req.params.clientId)
        const sessions = await Interaction.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
        for (var i = 0; i < sessions.length; i++) {
          for (var j = 0; j < sessions[i].attendees.length; j++) {
            if (sessions[i].attendees[j] === id) {
              attendedSessions.push(sessions[i])
            }
          }
        }
        res.send(attendedSessions)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured'
      })
    }
  }
}
