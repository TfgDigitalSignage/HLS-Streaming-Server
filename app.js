const express = require('express')
const HLSServer = require('hls-server')
const http = require('http')

const app = express()
const start_server = require('./routes/start-server')
const stop_server = require('./routes/stop-server')

app.use('/start-server', start_server)
app.use('/stop-server', stop_server)

app.use('/live', express.static('__TEMP/video/', {
    setHeaders: (res,path) =>{
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
        res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.set("X-Powered-By",' 3.2.1')
        if( path.split('.')[1] === 'ts')
            res.type('video/MP2T')
        else
            res.type('application/x-mpegURL')
    }
}))

app.use('/test', (req,res,next)=>{
    res.sendFile(__dirname + '/views/test.html')
})

app.listen(3000)