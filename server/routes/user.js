const router = require('express').Router()
let User = require('../models/userModel')


// Setting up get request for /users/ route to display all existing users

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err))
})

// Setting up post request to add new users when directed to /users/add route

router.route('/add').post((req, res) => {
    const username = req.body.username
    const activityGoal = req.body.activityGoal
    const gender = req.body.gender
    const birthday = req.body.birthday
    const weight = req.body.weight
    const height = req.body.height

    const newUser = new User({
        username,
        activityGoal,
        gender,
        birthday,
        weight,
        height
    })

// Save new user to DB

    newUser.save()
        .then(() => res.json('New user has been added! '))
        .catch(err => res.status(400).json('Error ' + err))
})


module.exports = router