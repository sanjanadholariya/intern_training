const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { allEmployee } = require('../controller/admin.controller');
const verifyRole = require('../middleware/verifyRole');
const routes = express.Router()

routes.get('/allEmployee', verifyToken, verifyRole('Admin'), allEmployee)

module.exports = routes;