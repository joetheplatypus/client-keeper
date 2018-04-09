const {Counselling} = require('../models')
const dateFormat = require('dateformat')

module.exports = {
  async index (req, res) {
    try {
      let sessions = null
      const search = req.query.search
      if (search) {
        sessions = await Counselling.findAll({
          where: {
          }
        })
      } else {
        sessions = await Counselling.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
      }
      res.send(sessions)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the sessions'
      })
    }
  },
  async post (req, res) {
    try {
      const session = await Counselling.create(req.body)
      res.send(session)
    } catch (err) {
      res.status(400).send({
        error: 'this session has already been created'
      })
    }
  },
  async get (req, res) {
    try {
      const session = await Counselling.findById(req.params.sessionId)
      if (!session) {
        res.send({
          error: 'session could not be found'
        })
      } else {
        res.send(session)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured getting the session'
      })
    }
  },
  async put (req, res) {
    try {
      const othersessions = await Counselling.findAll()
      for (var i = 0; i < othersessions.length; i++) {
        const date = dateFormat(othersessions[i].date, 'yyyy-mm-dd')
        if (date === req.body.date) {
          if (othersessions[i].id === parseInt(req.params.sessionId)) {
            await Counselling.update(req.body, {
              where: {
                id: req.params.sessionId
              }
            })
            res.send(req.body)
            return
          } else {
            res.status(400).send({
              error: 'this date has already been used to create a session'
            })
            return
          }
        }
      }
      await Counselling.update(req.body, {
        where: {
          id: req.params.sessionId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the session'
      })
    }
  }
}
