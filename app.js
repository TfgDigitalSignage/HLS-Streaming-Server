const express = require('express')
const app = express()
const start_server = require('./routes/start-server')
const stop_server = require('./routes/stop-server')

const common_opt = require('./config/common').common_option

app.use(common_opt.liveOutputPath, (req,res,next)=>{
    if (require('./config/util').server_status !== 1){
        res.status(404)
        return res.end()
    }
    next()
})

app.use('/live', express.static(common_opt.tempVideoPath, {
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

app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer.from(b64auth, 'base64').toString().split(':')
    
    if ((req.url.split('.')[1]!=='ts')){
        // Verify login and password are set and correct
        if (!login || !password || login !== common_opt.httpAuthUser || password !== common_opt.httpAuthPassword){
          res.set('WWW-Authenticate', 'Basic realm="Who are you?"')
          res.status(401).send('Authentication required.') // custom message
          return
        }
    }
  
    // -----------------------------------------------------------------------
    // Access granted...
    next()
})

app.use('/start-server', start_server)
app.use('/stop-server', stop_server)


app.listen(3000)