const express = require('express')
const routes = express.Router()

routes.use('/auth', require('./auth.routes'))
routes.use('/admin', require('./admin.routes'))

module.exports = routes