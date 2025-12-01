const express = require('express')
const app = express()
const port = 3300;

const sequelize = require('./config/dbConnection')

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', require('./routes/index.routes'))

sequelize.sync()
    .then(() => {
        console.log("database and tables synced...")

        app.listen(port, (err) => {
            err ? console.log(err) : console.log("Server Is Running On Port 3300")
        })
    })
    .catch((err) => {
        console.log("Unable to sync database", err)
    })