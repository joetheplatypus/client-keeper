const {Interaction} = require('../models')
const dateFormat = require('dateformat')

module.exports = {
  async index (req, res) {
    try {
      let sessions = null
      const search = req.query.search
      if (search) {
        sessions = await Interaction.findAll({
          where: {
          }
        })
      } else {
        sessions = await Interaction.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
      }
      res.send(sessions)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the interactions'
      })
    }
  },
  async post (req, res) {
    try {
      const session = await Interaction.create(req.body)
      res.send(session)
    } catch (err) {
      res.status(400).send({
        error: 'this interaction has already been created'
      })
    }
  },
  async get (req, res) {
    try {
      const session = await Interaction.findById(req.params.interactionId)
      if (!session) {
        res.send({
          error: 'interaction could not be found'
        })
      } else {
        res.send(session)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured getting the interaction'
      })
    }
  },
  async put (req, res) {
    try {
      const othersessions = await Interaction.findAll()
      for (var i = 0; i < othersessions.length; i++) {
        const date = dateFormat(othersessions[i].date, 'yyyy-mm-dd')
        if (date === req.body.date) {
          if (othersessions[i].id === parseInt(req.params.interactionId)) {
            await Interaction.update(req.body, {
              where: {
                id: req.params.interactionId
              }
            })
            res.send(req.body)
            return
          } else {
            res.status(400).send({
              error: 'this date has already been used to create an interaction'
            })
            return
          }
        }
      }
      await Interaction.update(req.body, {
        where: {
          id: req.params.interactionId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the interaction'
      })
    }
  },
  async delete (req, res) {
    try {
      Interaction.destroy({
        where: {
          id: req.params.interactionId
        }
      })
      res.status(200).send({
        message: 'interaction deleted successfully'
      })
    } catch (err) {
      res.status(400).send({
        error: 'could not delete interaction'
      })
    }
  }
}
