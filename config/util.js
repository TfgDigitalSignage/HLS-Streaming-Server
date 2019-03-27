const fs = require('fs')
const path = require('path')
exports.server_status = 0
//this method creates a new folder with name provided on common.js if already does not exist
exports.createFolder = ()=>{
    const folderName = require('./common').common_option.tempVideoPath
    const destPath = path.join(__dirname, '..', folderName)
    fs.exists(destPath, (exists)=>{
        if (!exists){
            fs.mkdir(destPath, (err)=>{
                if (err)
                    throw new Error(err)
            })
        }
    })
}