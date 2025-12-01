const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { allEmployee, editEmployee, deleteEmployee } = require('../controller/admin.controller');
const verifyRole = require('../middleware/verifyRole');
const routes = express.Router()

routes.get('/allEmployee', verifyToken, verifyRole('Admin'), allEmployee)
routes.put('/editEmployee/:id', verifyToken, verifyRole('Admin'), editEmployee)
routes.delete('/deleteEmployee/:id', verifyToken, verifyRole('Admin'), deleteEmployee)

module.exports = routes;