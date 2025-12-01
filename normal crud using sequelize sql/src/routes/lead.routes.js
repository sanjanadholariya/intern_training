const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const { addLead, editLead, deleteLead, allLead } = require('../controller/lead.controller');
const routes = express.Router()

routes.post('/addLead', verifyToken, verifyRole('Admin'), addLead)
routes.get('/allLead', verifyToken, verifyRole('Admin', 'Employee'), allLead)
routes.put('/editLead/:id', verifyToken, verifyRole('Admin', 'Employee'), editLead)
routes.delete('/deleteLead/:id', verifyToken, verifyRole('Admin'), deleteLead)

module.exports = routes;