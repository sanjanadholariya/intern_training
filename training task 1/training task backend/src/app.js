const express = require('express');
const app = express();
const port = 9000;
const dbConnection = require('./config/dbConnection')
dbConnection();
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use('/uploads', express.static('src/uploads'));

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', require('./routes/index.routes'))
app.listen(port, (err) => {
    err ? console.log("port error :- ", err) : console.log(`Port is running on http://localhost:${port}`)
})