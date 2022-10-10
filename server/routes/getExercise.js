const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const User = require('../models/users')
const Pushup = require('../models/pushups')
const Situp = require('../models/situps')
const sharedFunctions = require('./sharedFunctions')

// normal exercise
router.get('/normal/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id})
        var dailyExercise = {pushups: 0, situps: 0, runTimeInSeconds: 0}
        const fraction = ((Date.now() - user.birthdate) % (1000*60*60*24*365))/(1000*60*60*24*365)
        // set values for today
        dailyExercise.pushups = Math.round((user.targetAbilities.pushUpCount - user.currentAbilities.pushUpCount) * fraction + user.currentAbilities.pushUpCount)
        dailyExercise.situps = Math.round((user.targetAbilities.sitUpCount - user.currentAbilities.sitUpCount) * fraction + user.currentAbilities.sitUpCount)
        dailyExercise.runTimeInSeconds = Math.round((user.targetAbilities.runTimeInSeconds - user.currentAbilities.runTimeInSeconds) * fraction + user.currentAbilities.runTimeInSeconds)
        
        res.json(dailyExercise)
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

// related exercise
router.get('/related/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id})

        const results = await sharedFunctions.calcScore(Math.floor(user.birthdate/(365*24*60*60*1000)), user.currentAbilities.pushUpCount,user.currentAbilities.sitUpCount,user.currentAbilities.runTimeInSeconds)

        var reps = await Math.round(12 * results.total/100)

        var exercise = await Situp.aggregate([{$sample:{size:1}}])     
        exercise = exercise[0]   

        res.json({reps,exercise})
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router
