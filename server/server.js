require('dotenv').config()
// const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())
// app.use(cors())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on ('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// users
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

// findNearest
const findNearestRouter = require('./routes/findNearest')
app.use('/findNearest', findNearestRouter)

// getExercise
const getExerciseRouter = require('./routes/getExercise')
app.use('/getExercise', getExerciseRouter)

// others
const othersRouter = require('./routes/others')
app.use('/others', othersRouter)

// init listener
app.listen(3000, ()=> console.log('Started Server'))