const mongoose = require('mongoose')

const dbConnection = () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/training_task")
        console.log("DB is connected...")
    } catch (error) {
        console.log("db error :- ", error)
    }
}

module.exports = dbConnection;