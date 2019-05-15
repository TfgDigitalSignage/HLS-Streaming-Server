const express = require('express')
const router = express.Router()
const path = require('path')
//Start transcoding command
router.get('/', (req,res,next)=>{
    const opt = require('../config/common').config
    const ffmpeg_command = require('../encoder').command
    require('../config/util').createFolder()
    ffmpeg_command.output(path.join(opt.tempVideoPath, opt.hlsPlaylistBaseName)).run()
    require('../config/util').server_status = 1
    res.end('<h1>Server started successfully</h1>')
}) 

module.exports = router