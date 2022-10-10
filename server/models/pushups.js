const mongoose = require('mongoose')

const pushupSchema = new mongoose.Schema({
    Name:{type: String,required: true},
    Difficulty:{type: String,required: true},
    Description:{type: String,required: true},
    Comments:{type: String,required: true},
    Equipment:{type: String,required: false},
    Gif:{type: String,required: true},
})

module.exports = mongoose.model('Pushup', pushupSchema)