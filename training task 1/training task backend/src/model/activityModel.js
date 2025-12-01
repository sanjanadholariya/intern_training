const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead'
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['call', 'email', 'follow-up', , 'note'],
        required: true
    },
    description: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('activity', activitySchema)