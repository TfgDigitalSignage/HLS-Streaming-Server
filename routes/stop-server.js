const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    const ffmpeg_command = require('../encoder').command
    ffmpeg_command.kill('SIGKILL')
    res.end('<h1>Server has been stopped</h1>')
})

module.exports = router