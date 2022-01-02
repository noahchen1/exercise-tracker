require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')



const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000

// Conecting to MongoDB Atlas

const URI = process.env.ATLAS_URI
mongoose.connect(URI)

const connection = mongoose.connection
connection.on('error', err => console.error(err))
connection.once('open', () => {
    console.log("Connection to MongoDB Atlas has been established!")
})

// Setting up routes 

const activityRouter = require('./routes/activity')
const userRouter = require('./routes/user')

app.use('/activities', activityRouter)
app.use('/users', userRouter)


app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(port, () => console.log(`Server is running on ${port}`))