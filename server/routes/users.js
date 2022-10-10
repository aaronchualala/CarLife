const express = require('express')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')
const router = express.Router()
const User = require('../models/users')

// signup 
router.put('/', async (req, res) => {
    try {
        existingUser = await User.findOne({username:req.body.username})
        if(existingUser){
            throw new Error('Username is already taken!')
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({...req.body, password: hashedPassword})
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({message:err.message})
    }
})

// login account
router.get('/', getUser, (req, res) => {
    try{
        res.send(res.user)
    } catch (err){
        res.status(400).json({message:err.message})
    }
})

// update account
router.patch('/', getUser, async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        await User.updateOne(
            {username:res.user.username},
            {...req.body,password: hashedPassword}
        )
        
        res.send("User Information Updated!")
    } catch (err){
        res.status(500).json({message:err.message})
    }
})

// delete account
router.delete('/', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message:'User Deleted'})
    } catch (err) {
        res.status(500).json({ message: err. message })
    }
})

// shared middleware
async function getUser(req, res, next) {
    try {
        // check username
        user = await User.findOne({username:req.body.username})
        if(user == null){
            return res.status(404).json({ message: 'User Not Found' })
        }
        // check password
        if(await bcrypt.compare(req.body.password, user.password)){
            res.user = user
            next()
        } else {
            return res.status(404).json({ message: 'Incorrect Password' })
        }
    } catch (err) {
        return res.status(500). json({ message: err.message })
    }
}

module.exports = router