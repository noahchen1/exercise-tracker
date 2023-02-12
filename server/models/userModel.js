// Initiating Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

// Setting up properties for user schema 

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    activityGoal: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User