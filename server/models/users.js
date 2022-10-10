const mongoose = require('mongoose')

const abilitiesSchema = new mongoose.Schema({
    pushUpCount: {type: Number,required: true},
    sitUpCount: {type: Number,required: true},
    runTimeInSeconds: {type: Number,required: true}
})

const userSchema = new mongoose.Schema({
    username:{type: String,required: true},
    password:{type: String,required: true},
    name:{type: String,required: true},
    birthdate:{type: Number,required: true},
    residentialAddress:{type: String,required: true},
    currentAbilities: {type: abilitiesSchema,required: true},
    targetAbilities: {type: abilitiesSchema,required: true}
})

module.exports = mongoose.model('User', userSchema)