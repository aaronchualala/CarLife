const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const sharedFunctions = require('./sharedFunctions')
const strava = require('strava-v3')
const fetch = require('node-fetch-commonjs')

// pull data from strava
router.get('/strava/:accessToken', async (req, res) => {
    try {
        var response = await strava.athlete.listActivities({'after':Math.round(Date.now()/1000) - 60*60*24*7, 'access_token':req.params.accessToken})
        var adjustedRunTime = null
        for(let i=0; i<response.length; i++){
            if(response[i].type.includes("Run")){
                adjustedRunTime = (response[i].elapsed_time/response[i].distance)*2400
                break
            }
        }
        res.json(adjustedRunTime || "We were unable to find any runs completed during the past 7 days.")
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

// score generator
router.get('/score', async (req, res) => {
    try {  
        const response = await sharedFunctions.calcScore(req.query.age, req.query.pushups, req.query.situps, req.query.run)
        res.json({
            score: response.total, 
            result: response.result})
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

// Access Token should be generated on frontend and stored in client state. Below is just a helper function to generate it for server-side testing
// Steps:
    // (1)
    // make a request to strava auth server; for user to approve on redirected page
    // http://www.strava.com/oauth/authorize?client_id=95043&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
    // ^ copy the authorisation code from the failed req url
    // (2)
    // make another request to strava auth server using this authorisation code, response will contain the required access token (among other things)
router.get('/strava-access', async (req, res) => {
    try {
        const url = 'https://www.strava.com/oauth/token'
        const options = {
            method: 'post',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: '95043',
                client_secret: 'c33d6301462601d1569337215893134229881208',
                code:'d9480b97020686fc99704609f7c3e5773f99a3c8',
                grant_type: 'authorization_code'
            })
        }
        const response = await fetch(url, options).then((response)=>response.json())
        res.json(response)
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router
