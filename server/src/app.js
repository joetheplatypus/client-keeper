const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const routes = require('./routes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

routes(app)

sequelize.sync().then(function () {
  app.listen(config.port)
  console.log(`server started on port ${config.port}`)
})
