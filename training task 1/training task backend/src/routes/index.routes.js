const express = require('express');
const { register, login, profile, getLeads, updateLead, addActivity, viewActivity, getSingleLead } = require('../controller/index.controller');
const routes = express.Router()
const imageUpload = require('../middleware/imageUpload');
const { verifyToken } = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

routes.post('/register', imageUpload.single('profile'), register)
routes.post('/login', login)
routes.get('/profile', verifyToken, profile)
routes.get('/getLeads', verifyToken, verifyRole('admin', 'employee'), getLeads)
routes.put('/updateLead/:id', verifyToken, verifyRole('admin', 'employee'), updateLead)
routes.get('/getSingleLead/:id', verifyToken, verifyRole("admin", "employee"), getSingleLead)

routes.post('/addActivity/:id', verifyToken, verifyRole('admin', 'employee'), addActivity)
routes.get('/viewActivity/:id', verifyToken, verifyRole('admin', "employee"), viewActivity)

routes.use('/admin', require('./admin.routes'))


module.exports = routes;