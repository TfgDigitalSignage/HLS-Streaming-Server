const express = require('express')
const router = express.Router()
//Stop transcoding command
router.get('/', (req,res,next)=>{
    if (require('../config/util').server_status === 1){
        const ffmpeg_command = require('../encoder').command
        ffmpeg_command.ffmpegProc.stdin.write('q')
        require('../config/util').server_status = 0
        res.statatus(200).json({
            status: "success",
            result: "Server stop successfully"
        })
    }
    else{
        res.status(200).json({
            status: "error",
            result: "Server is not running"
        })
    }
})

module.exports = router