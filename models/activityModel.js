// Initiating Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setting up required properties for the activity schema

const activitySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }, 
}, {
    timestamps: true
})

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity