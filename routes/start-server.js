const express = require('express')
const router = express.Router()
//Start transcoding command
router.get('/', (req,res,next)=>{
    const ffmpeg_command = require('../encoder').command
    ffmpeg_command.output('__TEMP/video/playlist.m3u8').run()
    require('../config/util').server_status = 1
    res.end('<h1>Server started successfully</h1>')
})

module.exports = router