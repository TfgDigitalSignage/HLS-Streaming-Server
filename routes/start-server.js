const express = require('express')
const router = express.Router()
const path = require('path')
//Start transcoding command
router.get('/', (req,res,next)=>{
    const opt = require('../config/common').config
    const ffmpeg_command = require('../encoder').command
    require('../config/util').createFolder()
    try {
        ffmpeg_command.output(path.join(opt.tempVideoPath, opt.hlsPlaylistBaseName)).run()
    }catch(exception){
        console.log(exception)
        return res.status(500).end()
    }
    require('../config/util').server_status = 1
    res.status(200).json({
        status: 'success',
        result: 'Server started successfully'
    })
}) 

module.exports = router