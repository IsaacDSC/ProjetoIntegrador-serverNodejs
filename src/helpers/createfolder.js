const fs = require('fs')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'image', 'collaborators')


async function createdFolfer(name){
    if(!fs.existsSync(`${folder}/${name}`)){
       await fs.mkdirSync(`${folder}/${name}`)
    }
}


exports.createdFolfer = createdFolfer