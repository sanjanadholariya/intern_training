const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const { addProject, allProject, editProject, deleteProject } = require('../controller/project.controller');
const { editEmployee } = require('../controller/admin.controller');
const routes = express.Router()

routes.post('/addProject/:id', verifyToken, verifyRole('Admin', 'Employee'), addProject)
routes.get('/allProject', verifyToken, verifyRole('Admin', 'Employee'), allProject)
routes.put('/editProject/:id', verifyToken, verifyRole('Admin', 'Employee'), editProject)
routes.delete('/deleteProject/:id', verifyToken, verifyRole('Admin'), deleteProject)

module.exports = routes;