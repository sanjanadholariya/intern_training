const express = require('express');
const { allEmployeeProfile, assignLead, deleteLead } = require('../controller/admin.controller');
const { verifyToken } = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const routes = express.Router()

routes.get('/allEmployeeProfile', verifyToken, verifyRole('admin'), allEmployeeProfile)
routes.post('/assignLead', verifyToken, verifyRole('admin'), assignLead)
routes.delete('/deleteLead/:id', verifyToken, verifyRole("admin"), deleteLead)

module.exports = routes;