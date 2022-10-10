const fetch = require('node-fetch-commonjs');

async function calcScore(age, pushups, situps, runtime){
    const results = await fetch(`https://ippt.vercel.app/api?age=${age}&situps=${situps}&pushups=${pushups}&run=${runtime}`).then((response)=>response.json())
    return results
}

exports.calcScore = calcScore
