const mongoose = require('mongoose')

const leadSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    budget: String,
    status: {
        type: String,
        enum: ['new', 'in-progress', 'won', 'lost']
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('lead', leadSchema)