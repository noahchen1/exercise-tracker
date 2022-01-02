const router = require('express').Router()
let Activity = require('../models/activityModel')

// Setting up get request for /activities/ route to display all existing activities

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error ' + err))
})

// Setting up post request to add new activity tied to specific user to /activities/add route

router.route('/add').post((req, res) => {
    const username = req.body.username
    const title = req.body.title
    const activity = req.body.activity
    const start = Date.parse(req.body.start)
    const duration = Number(req.body.duration)

    const newActivity = new Activity({
        username,
        title,
        activity,
        start,
        duration,
    })

// Save new activity to DB

    newActivity.save()
        .then(() => res.json('New activity has been added!'))
        .catch((err => res.status(400).json('Error ' + err)))
})

module.exports = router