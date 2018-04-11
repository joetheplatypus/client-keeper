const {Dropin} = require('../models')
// const dateFormat = require('dateformat')

module.exports = {
  async index (req, res) {
    try {
      let dropins = null
      const search = req.query.search
      if (search) {
        dropins = await Dropin.findAll({
          where: {
          }
        })
      } else {
        dropins = await Dropin.findAll({
          limit: 100,
          order: [['date', 'DESC']]
        })
      }
      res.send(dropins)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the dropins'
      })
    }
  },
  async post (req, res) {
    try {
      const dropin = await Dropin.create(req.body)
      res.send(dropin)
    } catch (err) {
      res.status(400).send({
        error: 'this dropin has already been created'
      })
    }
  },
  async get (req, res) {
    try {
      const dropin = await Dropin.findById(req.params.dropinId)
      if (!dropin) {
        res.send({
          error: 'dropin could not be found'
        })
      } else {
        res.send(dropin)
      }
    } catch (err) {
      res.status(400).send({
        error: 'a problem occured getting the dropin'
      })
    }
  },
  async put (req, res) {
    try {
      const otherdropins = await Dropin.findAll()
      for (var i = 0; i < otherdropins.length; i++) {
        const date = otherdropins[i].date
        if (date === req.body.date) {
          if (otherdropins[i].id === parseInt(req.params.dropinId)) {
            await Dropin.update(req.body, {
              where: {
                id: req.params.dropinId
              }
            })
            res.send(req.body)
            return
          } else {
            res.status(400).send({
              error: 'this date has already been used to create a dropin'
            })
            return
          }
        }
      }
      await Dropin.update(req.body, {
        where: {
          id: req.params.dropinId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the dropin'
      })
    }
  },
  async delete (req, res) {
    try {
      Dropin.destroy({
        where: {
          id: req.params.dropinId
        }
      })
      res.status(200).send({
        message: 'dropin deleted successfully'
      })
    } catch (err) {
      res.status(400).send({
        error: 'could not delete dropin'
      })
    }
  }
}
