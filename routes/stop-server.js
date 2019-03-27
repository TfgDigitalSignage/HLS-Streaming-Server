const express = require('express')
const router = express.Router()
//Stop transcoding command
router.get('/', (req,res,next)=>{
    if (require('../config/util').server_status === 1){
        const ffmpeg_command = require('../encoder').command
        ffmpeg_command.ffmpegProc.stdin.write('q')
        require('../config/util').server_status = 0
        res.end('<h1>Server has been stopped</h1>')
    }
    else{
        res.end('<h1>Server is not running</h1>')
    }
})

module.exports = router