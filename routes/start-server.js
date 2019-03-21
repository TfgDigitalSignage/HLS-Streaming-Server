const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    const ffmpeg_command = require('../encoder').command
    ffmpeg_command.on('error', (err)=>{
        throw err;
        ffmpeg_command.kill()
    })
    ffmpeg_command.output('__TEMP/video/playlist.m3u8').run()
    res.end('<h1>Server started successfully</h1>')
})

module.exports = router