const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    Datetime:{type: Number,required: true},
    senderId:{type: Number,required: true},
    ReceiverId:{type: Number,required: true},
    Text:{type: String,required: true},
})

module.exports = mongoose.model('Message', messageSchema)