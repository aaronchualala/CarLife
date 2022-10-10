const mongoose = require('mongoose')

const gymSchema = new mongoose.Schema({
    latitude:{type: Number,required: true},
    longitude:{type: Number,required: true},
})

module.exports = mongoose.model('Gym', gymSchema)