const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const routes = express.Router()

routes.use('/auth', require('./auth.routes'))
routes.use('/admin', require('./admin.routes'))
routes.use('/lead', require('./lead.routes'))
routes.use('/project', require('./product.routes'))

module.exports = routes