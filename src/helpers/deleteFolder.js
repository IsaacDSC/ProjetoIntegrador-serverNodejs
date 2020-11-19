const fs = require('fs')
const path = require('path')
const dir = path.resolve(__dirname + '', '../', 'public', 'image', 'collaborators')

async function apagar(folder){
    await fs.unlink(`${dir}/${folder}`, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Pasta deletada com sucesso!")
        }
    });
}

exports.apagar = apagar