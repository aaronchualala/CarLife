const mongoose = require('mongoose')

const parkSchema = new mongoose.Schema({
    latitude:{type: Number,required: true},
    longitude:{type: Number,required: true},
})

module.exports = mongoose.model('Park', parkSchema)