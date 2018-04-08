const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// adding all files in this directory as models
const files = fs.readdirSync(__dirname).filter(function (file) { return file !== 'index.js' })
console.log(files)

files.forEach(function (file) {
  const _path = path.join(__dirname, file)
  const model = sequelize.import(_path)
  db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
